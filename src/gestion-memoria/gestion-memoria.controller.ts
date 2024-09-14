import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CrearAjusteDTO } from 'src/dtos/crear-ajuste.dto';
import { GestionMemoriaService } from './gestion-memoria.service';
import { CrearParticionDTO } from 'src/dtos/crear-particion.dto';


@Controller('gestion-memoria')
export class GestionMemoriaController {

    constructor(private gestionMemoriaService: GestionMemoriaService) {}

    @Post()
    crearAjuste(@Body() nuevoAjuste: CrearAjusteDTO) {
        return this.gestionMemoriaService.crearAjuste(nuevoAjuste)
    }

    @Post()
    crearParticion(@Body() nuevaParticion: CrearParticionDTO) {
        return this.gestionMemoriaService.crearParticion(nuevaParticion)
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
}
