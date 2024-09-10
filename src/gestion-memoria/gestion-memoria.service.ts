import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ajustes } from 'src/entities/ajustes.entity';
import { Particiones } from 'src/entities/particiones.entity';
import { Repository } from 'typeorm';
import { CrearAjusteDTO } from '../dtos/crear-ajuste.dto'
import { CrearParticionDTO } from 'src/dtos/crear-particion.dto';

@Injectable()
export class GestionMemoriaService {

    constructor(
        @InjectRepository(Ajustes) private ajustesRepository: Repository<Ajustes>,
        @InjectRepository(Particiones) private particionesRepository: Repository<Particiones>
    ) {}

    crearAjuste(ajuste: CrearAjusteDTO) {
        const nuevoAjuste = this.ajustesRepository.create(ajuste)
        return this.ajustesRepository.save(nuevoAjuste)
    }

    crearParticion(particiones: CrearParticionDTO) {
        const nuevaParticion = this.particionesRepository.create(particiones)
        return this.particionesRepository.save(nuevaParticion)
    }

}
