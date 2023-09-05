import { IsString,IsNumber,Min,Max,IsLongitude,IsLatitude, MAX } from "class-validator";

export class CreateReportDto{
    @IsString()
    make : string;

    @IsString()
    model : string;
    
    @IsNumber()
    @Min(1930)
    @Max(2030)
    year : number;

    @IsLongitude()
    lng : number;

    @IsLatitude()
    lat : number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage : number;

    @IsNumber()
    @Min(0)
    @Max(100000000)
    price : number;
}