import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AnimeRatingDto } from "./anime-rating.dto";

export class BulkAnimeRatingDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => AnimeRatingDto)
    anime: AnimeRatingDto[];
}