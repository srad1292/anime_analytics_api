import { IsNumberString, IsBooleanString, ValidateIf } from "class-validator";

export class PaginationOptionsQuery {

    @IsBooleanString()
    paginate: string;

    @ValidateIf(pagination => pagination.paginate === "true")
    @IsNumberString()
    page: string;
    
    @ValidateIf(pagination => pagination.paginate === "true")
    @IsNumberString()
    records: string;
}