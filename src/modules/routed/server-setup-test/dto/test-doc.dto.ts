import { IsString, IsNumber, ValidateNested } from "class-validator";

export class TestDocDto {

    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsString({each: true})
    hobbies: string[];
}