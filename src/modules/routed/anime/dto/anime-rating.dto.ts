import { IsNumber, IsString, IsISO8601, IsOptional } from "class-validator"
import { AnimeDto } from "./anime.dto";

export class AnimeRatingDto extends AnimeDto {
    
    @IsString()
    @IsOptional()
    ratingId: string;

    @IsNumber()
    animeListStatus: number;

    @IsString()
    animeListStatusName: string;
    
    @IsNumber()
    animeListScore: number;
    
    @IsISO8601()
    animeListFinishedDate: string;
}