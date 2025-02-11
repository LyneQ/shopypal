import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 20)
    password: string;
}
