import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ajustes } from 'src/entities/ajustes.entity';
import { Particiones } from 'src/entities/particiones.entity';
import { Repository } from 'typeorm';
import { CrearAjusteDTO } from '../dtos/crear-ajuste.dto'
import { CrearParticionDTO } from 'src/dtos/crear-particion.dto';
import { Procesos } from 'src/entities/procesos.entity';
import { CreateProcesoDto } from 'src/dtos/crear-proceso.dto';
import { Asignaciones } from 'src/entities/asignaciones.entity';
import { CrearAsignacionDTO } from 'src/dtos/crear-asignacion.dto';
import { ActualizarEstadoParticionDTO } from 'src/dtos/actualizar-estado.dto';
import { ColaProcesos } from 'src/entities/colaProcesos.entity';
import { CrearColaProcesoDTO } from 'src/dtos/crear-cola-proceso.dto';
import { ActualizarPrioridadProcesoDTO } from 'src/dtos/actualizar-prioridad-proceso.dto';

@Injectable()
export class GestionMemoriaService {

    constructor(
        @InjectRepository(Ajustes) private ajustesRepository: Repository<Ajustes>,
        @InjectRepository(Particiones) private particionesRepository: Repository<Particiones>,
        @InjectRepository(Procesos) private procesosRepository: Repository<Procesos>,
        @InjectRepository(Asignaciones) private asignacionesRepository: Repository<Asignaciones>,
        @InjectRepository(ColaProcesos) private colaProcesosRepository: Repository<ColaProcesos>
    ) {}

    crearAjuste(ajuste: CrearAjusteDTO) {
        const nuevoAjuste = this.ajustesRepository.create(ajuste)
        return this.ajustesRepository.save(nuevoAjuste)
    }

    async crearParticion(particionesDTO: CrearParticionDTO) {
        const nuevasParticiones = [];
    
        for (const particionDTO of particionesDTO.particiones) {
            const ajuste = await this.ajustesRepository.findOne({ where: { id: particionDTO.tipo_ajuste_id } });
            
            if (!ajuste) {
                throw new Error(`El ajuste con ID ${particionDTO.tipo_ajuste_id} no existe`);
            }
    
            const nuevaParticion = this.particionesRepository.create({
                tamaño: particionDTO.tamaño,
                tipoAjuste: ajuste,  // Aquí estamos asignando la entidad `Ajustes`
                estado: particionDTO.estado,
                unidad_medida: particionDTO.unidad_medida
            });
    
            nuevasParticiones.push(nuevaParticion);
        }
    
        return this.particionesRepository.save(nuevasParticiones);
    }

    crearProceso(createProcesoDto: CreateProcesoDto) {
        const newProceso = this.procesosRepository.create(createProcesoDto);
        return this.procesosRepository.save(newProceso);
    }

    async crearAsignacion(createAsignacionDto: CrearAsignacionDTO) {
        const { proceso_id, particion_id } = createAsignacionDto;
    
        // Verificar que el proceso existe
        const proceso = await this.procesosRepository.findOne({
            where: { id: proceso_id }
        });
        if (!proceso) {
            throw new Error(`Proceso con ID ${proceso_id} no existe.`);
        }
    
        // Verificar que la partición existe
        const particion = await this.particionesRepository.findOne({
            where: { id: particion_id }
        });
        if (!particion) {
            throw new Error(`Partición con ID ${particion_id} no existe.`);
        }
    
        // Crear y guardar la nueva asignación
        const nuevaAsignacion = this.asignacionesRepository.create({ proceso, particion });
        return this.asignacionesRepository.save(nuevaAsignacion);
    }
    

    async crearColaProceso(createColaProcesoDto: CrearColaProcesoDTO) {
        const { proceso_id } = createColaProcesoDto;

        // Verificar que el proceso existe
        const proceso = await this.procesosRepository.findOne({
            where: { id: proceso_id }
        });
        if (!proceso) {
            throw new Error(`Proceso con ID ${proceso_id} no existe.`);
        }

        const nuevaCola = this.colaProcesosRepository.create({proceso});
        return this.colaProcesosRepository.save(nuevaCola);
    }

    mostrarAjuste() {
        return this.ajustesRepository.find()
    }

    mostrarParticionesSegunAjuste(tipoAjusteId: number): Promise<Particiones[]> {
        return this.particionesRepository.find({
        where: { tipoAjuste: { id: tipoAjusteId } },
        });
    }

    async actualizarEstadoParticion(id: number, actualizarEstadoDto: ActualizarEstadoParticionDTO): Promise<Particiones> {
        const particion = await this.particionesRepository.findOne({ where: { id } });
        
        if (!particion) {
            throw new NotFoundException(`Partición con ID ${id} no encontrada`);
        }

        particion.estado = actualizarEstadoDto.estado;
        particion.updatedAt = new Date(); // actualizamos el campo de `updatedAt`
        
        return this.particionesRepository.save(particion);
    }

    
    async actualizarEstadoProceso(id: number): Promise<Procesos> {
        // Busca el proceso por ID
        const proceso = await this.procesosRepository.findOneBy({ id });

        // Verifica si el proceso existe
        if (!proceso) {
            throw new NotFoundException('Proceso no encontrado');
        }

        proceso.estado = 1;
        proceso.updatedAt = new Date();

        // Guarda los cambios
        return await this.procesosRepository.save(proceso);
    }

    async actualizarPrioridadProceso(id: number, actualizarEstadoProcesoDto: ActualizarPrioridadProcesoDTO): Promise<Procesos> {
        // Busca el proceso por ID
        const proceso = await this.procesosRepository.findOneBy({ id });

        // Verifica si el proceso existe
        if (!proceso) {
            throw new NotFoundException('Proceso no encontrado');
        }

        proceso.prioridad = actualizarEstadoProcesoDto.prioridad;
        proceso.updatedAt = new Date();

        // Guarda los cambios
        return await this.procesosRepository.save(proceso);
    }

    async borrarProceso(id: number): Promise<Procesos> {
        // Busca el proceso por ID
        const proceso = await this.procesosRepository.findOneBy({ id });

        // Verifica si el proceso existe
        if (!proceso) {
            throw new NotFoundException('Proceso no encontrado');
        }

        // Actualiza el campo deletedAt con la fecha actual
        proceso.estado = 0;
        proceso.deletedAt = new Date();

        // Guarda los cambios
        return await this.procesosRepository.save(proceso);
    }

    async borrarAsignacion(proceso_id: number): Promise<Asignaciones> {
        // Encontrar el proceso con el ID dado
        const proceso = await this.procesosRepository.findOneBy({ id: proceso_id });
    
        if (!proceso) {
            throw new NotFoundException('Proceso no encontrado');
        }
    
        // Buscar la asignación usando el proceso encontrado
        const asignacion = await this.asignacionesRepository.findOne({
            where: {
                proceso: proceso // Usar la relación para buscar
            }
        });
    
        if (!asignacion) {
            throw new NotFoundException('Asignación no encontrada');
        }
    
        // Actualizar los campos de la asignación
        asignacion.updatedAt = new Date();
        asignacion.deletedAt = new Date();
    
        // Guardar la asignación actualizada
        return await this.asignacionesRepository.save(asignacion);
    }

    async borrarColaProceso(proceso_id: number): Promise<ColaProcesos> {
        const proceso  =  await this.procesosRepository.findOneBy({ id: proceso_id });

        if (!proceso) {
            throw new NotFoundException('Proceso no encontrado');
        }

        const colaProceso = await this.colaProcesosRepository.findOne({
            where: {
                proceso: proceso
            }
        });

        colaProceso.updatedAt = new Date();
        colaProceso.deletedAt = new Date();

        return await this.colaProcesosRepository.save(colaProceso);
    }
}
