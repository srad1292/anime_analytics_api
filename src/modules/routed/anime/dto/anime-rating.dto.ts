import { IsNumber, IsString, IsISO8601 } from "class-validator"
import { AnimeDto } from "./anime.dto";

export class AnimeRatingDto extends AnimeDto {
    
    @IsNumber()
    animeListStatus: number;

    @IsString()
    animeListStatusName: string;
    
    @IsNumber()
    animeListScore: number;
    
    @IsISO8601()
    animeListFinishedDate: string;
}