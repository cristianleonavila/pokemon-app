import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { PokemonAPIResponse } from './interfaces/pokemon-api.response';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {

  }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});


    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=650`);
    const json: PokemonAPIResponse = await response.json();
    const { results = [] } = json;
    const bulkCreate: {name:string, no: number}[]= [];
    /*
    #Insersión de registros mediante promesas
    const bulkCreate: any[] = [];
    results.forEach(({name, url}) => {
      const segmentos = url.split('/');
      const no:number = +segmentos[segmentos.length - 2];
      bulkCreate.push(this.pokemonModel.create({no, name}));
    });
    await Promise.all(bulkCreate);*/
    results.forEach(({ name, url }) => {
      const segmentos = url.split('/');
      const no: number = +segmentos[segmentos.length - 2];
      bulkCreate.push({no, name});
    });
    await this.pokemonModel.insertMany(bulkCreate);
    return 'Seed executed';
  }

}
