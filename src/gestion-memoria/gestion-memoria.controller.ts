import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearAjusteDTO } from 'src/dtos/crear-ajuste.dto';
import { GestionMemoriaService } from './gestion-memoria.service';
import { CrearParticionDTO } from 'src/dtos/crear-particion.dto';
import { CreateProcesoDto } from 'src/dtos/crear-proceso.dto';
import { CrearAsignacionDTO } from 'src/dtos/crear-asignacion.dto';
import { ActualizarEstadoParticionDTO } from 'src/dtos/actualizar-estado.dto';
import { CrearColaProcesoDTO } from 'src/dtos/crear-cola-proceso.dto';
import { ActualizarPrioridadProcesoDTO } from 'src/dtos/actualizar-prioridad-proceso.dto';


@Controller('gestion-memoria')
export class GestionMemoriaController {

    constructor(private gestionMemoriaService: GestionMemoriaService) {}

    @Post("/crearAjuste")
    crearAjuste(@Body() nuevoAjuste: CrearAjusteDTO) {
        return this.gestionMemoriaService.crearAjuste(nuevoAjuste)
    }

    @Post("/crearParticion")
    crearParticion(@Body() nuevaParticion: CrearParticionDTO) {
        return this.gestionMemoriaService.crearParticion(nuevaParticion)
    }

    @Post("/crearProceso")
    crearProceso(@Body() nuevoProceso: CreateProcesoDto) {
        return this.gestionMemoriaService.crearProceso(nuevoProceso)
    }

    @Post("/crearAsignacion")
    crearAsignacion(@Body() nuevaAsignacion: CrearAsignacionDTO) {
        return this.gestionMemoriaService.crearAsignacion(nuevaAsignacion);
    }

    @Post("/crearColaProceso")
    crearColaProceso(@Body() nuevaCola: CrearColaProcesoDTO) {
        return this.gestionMemoriaService.crearColaProceso(nuevaCola);
    }

    @Get("/mostrarAjustes")
    mostrarAjustes() {
        return this.gestionMemoriaService.mostrarAjuste();
    }

    @Get('/mostrarParticiones/:tipoAjusteId')
    mostrarParticionesSegunAjuste(@Param('tipoAjusteId') tipoAjusteId: string) {
        const tipoAjusteIdNum = parseInt(tipoAjusteId, 10); // Convertir el parámetro a número
        return this.gestionMemoriaService.mostrarParticionesSegunAjuste(tipoAjusteIdNum);
    }

    @Patch('/actualizarEstadoParticion/:id')
    actualizarEstadoParticion(
        @Param('id', ParseIntPipe) id: number, 
        @Body() actualizarEstadoDto: ActualizarEstadoParticionDTO
    ) {
        return this.gestionMemoriaService.actualizarEstadoParticion(id, actualizarEstadoDto);
    }

    @Patch('/actualizarEstadoProceso/:id')
    actualizarEstadoProceso(@Param('id', ParseIntPipe) id: number) {
        return this.gestionMemoriaService.actualizarEstadoProceso(id);
    }

    @Patch('/actualizarPrioridadProceso/:id')
    actualizarPrioridadProceso(
        @Param('id', ParseIntPipe) id: number, 
        @Body() actualizarPrioridadProcesoDto: ActualizarPrioridadProcesoDTO // Asegúrate de usar @Body
    ) {
        return this.gestionMemoriaService.actualizarPrioridadProceso(id, actualizarPrioridadProcesoDto);
    }

    @Patch('/BorrarProceso/:id')
    async borrarProceso(@Param('id', ParseIntPipe) id: number) {
        const proceso = await this.gestionMemoriaService.borrarProceso(id);
        return {
            message: `Proceso con ID ${id} marcado como eliminado`,
            proceso,
        };
    }

    @Patch('/BorrarAsignacion/:proceso_id')
    async borrarAsignacion(@Param('proceso_id', ParseIntPipe) proceso_id: number) {
        try {
            // Llama al servicio para borrar la asignación
            const asignacion = await this.gestionMemoriaService.borrarAsignacion(proceso_id);
            
            // Devuelve una respuesta exitosa
            return {
                message: `Asignación con proceso_id ${proceso_id} marcada como eliminada`,
                asignacion,
            };
        } catch (error) {
            // Maneja errores y devuelve un mensaje adecuado
            return {
                message: `Error al marcar la asignación con proceso_id ${proceso_id} como eliminada`,
                error: error.message,
            };
        }
    }

    @Patch('/BorrarColaProceso/:proceso_id')
    async borrarColaProceso(@Param('proceso_id', ParseIntPipe) proceso_id: number) {
        try {
            const colaProceso = await this.gestionMemoriaService.borrarColaProceso(proceso_id)

            return {
                message: `cola con proceso_id ${proceso_id} marcada como eliminada`,
                colaProceso
            }
        } catch (error) {
            return {
                message: `Error al marcar la cola con proceso_id ${proceso_id} como eliminada`,
                error: error.message,
            };
        }
    }
}
