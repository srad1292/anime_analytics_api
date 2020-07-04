import { AnimeAiredSegmentDto } from "./anime-aired-segment.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AnimeAiredRangeDto {
    
    @ValidateNested()
    @Type(() => AnimeAiredSegmentDto)
    from: AnimeAiredSegmentDto;

    @ValidateNested()
    @Type(() => AnimeAiredSegmentDto)
    to: AnimeAiredSegmentDto;
}