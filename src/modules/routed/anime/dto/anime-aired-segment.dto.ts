import { IsNumber, IsOptional } from "class-validator";

export class AnimeAiredSegmentDto {

    @IsNumber()
    @IsOptional()
    day?: number;
    
    @IsNumber()
    @IsOptional()
    month?: number;
    
    @IsNumber()
    @IsOptional()
    year?: number;
}