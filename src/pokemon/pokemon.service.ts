import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;      
    } catch (error:any) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    if ( !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.trim().toLowerCase()});
    }
    if ( !pokemon ) {
      throw new NotFoundException(`Pokemon not found`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
        const updatedPokemon = (await pokemon).updateOne(updatePokemonDto);
        return { ...pokemon.toJSON(), ...updatePokemonDto};  
    } catch (error:any) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`El Pokemon ya existe ${JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException("No se pudo guardar el pokemon");
  }

  async remove(id: string) {
    const deletedPokemon = await this.pokemonModel.findByIdAndDelete(id);
    if ( !deletedPokemon ) {
      throw new NotFoundException(`El pokemon con id ${id} no existe o ya fué eliminado`);
    }
    return deletedPokemon;
  }

  delete() {
    return this.pokemonModel.deleteMany({});
  }
}
