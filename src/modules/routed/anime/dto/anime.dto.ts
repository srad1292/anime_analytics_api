import { IsNumber, IsString, IsBoolean, ValidateNested, IsArray, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { AnimeAiredDto } from "./anime-aired.dto";
import { MalItemDto } from "./mal-item.dto";
import { AnimeRelatedDto } from "./anime-related.dto";

export class AnimeDto {

    @IsNumber()
    malId: Number;

    @IsString() 
    url: string;

    @IsString() 
    @IsOptional()
    imageUrl?: string;

    @IsString() 
    @IsOptional()
    trailerUrl?: string;

    @IsString() 
    title: string;

    @IsString() 
    @IsOptional()
    titleEnglish?: string;

    @IsString() 
    titleJapanese: string;

    @IsString({each: true}) 
    titleSynonyms: string;

    @IsString() 
    type: string;

    @IsString() 
    source: string;

    @IsNumber() 
    episodes: number;

    @IsString() 
    status: string;

    @IsBoolean()
    airing: boolean;

    @ValidateNested()
    @Type(() => AnimeAiredDto)
    aired: AnimeAiredDto;

    @IsString() 
    duration: string;

    @IsString() 
    rating: string;

    @IsNumber() 
    score: number;

    @IsNumber() 
    scoredBy: number;

    @IsNumber() 
    rank: number;

    @IsNumber() 
    popularity: number;

    @IsNumber() 
    members: number;

    @IsNumber() 
    favorites: number;

    @IsString() 
    synopsis: string;

    @IsString()
    @IsOptional()
    background?: string;

    @IsString() 
    @IsOptional()
    premiered?: string;

    @IsString() 
    @IsOptional()
    broadcast?: string;

    @ValidateNested({each: true})
    @Type(() => AnimeRelatedDto)
    @IsOptional()
    related?: AnimeRelatedDto;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    producers: MalItemDto[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    licensors: MalItemDto[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    studios: MalItemDto[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    genres: MalItemDto[];

    @IsString({each: true})
    openingThemes: string[];

    @IsString({each: true})
    endingThemes: string[];
}