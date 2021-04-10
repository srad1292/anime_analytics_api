import { IsString, MinLength, IsNumberString } from "class-validator";

export class SearchAnimeDto {
    
    @IsString()
    @MinLength(3)
    title: string;

    @IsNumberString()
    page: string;
}