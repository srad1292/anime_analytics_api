import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AnimeDto } from "./anime.dto";

export class BulkAnimeDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => AnimeDto)
    anime: AnimeDto[];
}