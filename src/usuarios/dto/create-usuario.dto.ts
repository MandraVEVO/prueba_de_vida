import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    nombre: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    apellidopa: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    apellidoma: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
