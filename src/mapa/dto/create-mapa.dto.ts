import { IsString } from "class-validator";

export class CreateMapaDto {
    @IsString()
    name: string;
    
    @IsString()
    url: string;
}
