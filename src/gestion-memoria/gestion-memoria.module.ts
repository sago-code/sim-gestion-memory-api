import { Module } from '@nestjs/common';
import { GestionMemoriaController } from './gestion-memoria.controller';
import { GestionMemoriaService } from './gestion-memoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ajustes } from 'src/entities/ajustes.entity';
import { Particiones } from 'src/entities/particiones.entity';
import { Procesos } from 'src/entities/procesos.entity';
import { Asignaciones } from 'src/entities/asignaciones.entity';
import { ColaProcesos } from 'src/entities/colaProcesos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Ajustes,
    Particiones,
    Procesos,
    Asignaciones,
    ColaProcesos
  ])],
  controllers: [GestionMemoriaController],
  providers: [GestionMemoriaService]
})
export class GestionMemoriaModule {}
