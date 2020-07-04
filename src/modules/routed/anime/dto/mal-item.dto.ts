import { IsNumber, IsString } from "class-validator";

export class MalItemDto {

    @IsNumber()
    malId: number;

    @IsString()
    type: string;

    @IsString()
    name: string;

    @IsString()
    url: string;
}