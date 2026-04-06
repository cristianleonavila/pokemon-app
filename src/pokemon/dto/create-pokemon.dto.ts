import { IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @Min(1)
    @IsPositive()
    @IsPositive()
    no: number;

    @IsString()
    @MinLength(1)
    name:string
}
