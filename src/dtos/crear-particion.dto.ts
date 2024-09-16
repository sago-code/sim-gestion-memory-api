import { IsArray, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearParticionDTO {
    @IsArray()
    @ArrayMaxSize(6)  // Permitir hasta 6 particiones
    @ValidateNested({ each: true })
    @Type(() => ParticionDTO)  // SubDTO para cada partición
    particiones: ParticionDTO[];
}

export class ParticionDTO {
    tamaño: number;
    tipo_ajuste_id: number;
    estado: number;
    unidad_medida: string;
}