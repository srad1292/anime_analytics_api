import { IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { AnimeAiredRangeDto } from "./anime-aired-range.dto";

export class AnimeAiredDto {
    
    @IsString()
    @IsOptional()
    from?: string;

    @IsString()
    @IsOptional()
    to?: string;

    @ValidateNested()
    @Type(() => AnimeAiredRangeDto)
    prop: AnimeAiredRangeDto;

    @IsString()
    @IsOptional()
    string?: string;
}