import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ajustes } from 'src/entities/ajustes.entity';
import { Particiones } from 'src/entities/particiones.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GestionMemoriaService {

    constructor(
        @InjectRepository(Ajustes) ajustesRepository: Repository<Ajustes>,
        @InjectRepository(Particiones) particionesRepository: Repository<Particiones>
    ) {
        
    }
}
