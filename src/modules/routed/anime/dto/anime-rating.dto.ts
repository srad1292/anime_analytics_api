import { IsNumber, IsString, IsISO8601 } from "class-validator"

export class AnimeRatingDto {
    
    @IsNumber()
    animeListStatus: number;

    @IsString()
    animeListStatusName: string;
    
    @IsNumber()
    animeListScore: number;
    
    @IsISO8601()
    animeListFinishedDate: string;
}