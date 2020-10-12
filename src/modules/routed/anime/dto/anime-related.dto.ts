import { ValidateNested, IsOptional } from "class-validator"
import { Type } from "class-transformer"
import { MalItemDto } from "./mal-item.dto"

export class AnimeRelatedDto {
    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    adaptation: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    alternativeSetting: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    alternativeVersion: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    character: MalItemDto[];
    
    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    other: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    parentStory: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    prequel: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    sequel: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    sideStory: MalItemDto[];
    
    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    spinOff: MalItemDto[];

    @ValidateNested({each: true})
    @Type(() => MalItemDto)
    @IsOptional()
    summary: MalItemDto[];

}