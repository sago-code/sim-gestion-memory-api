import { Module } from '@nestjs/common';
import { GestionMemoriaController } from './gestion-memoria.controller';
import { GestionMemoriaService } from './gestion-memoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ajustes } from 'src/entities/ajustes.entity';
import { Particiones } from 'src/entities/particiones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Ajustes,
    Particiones
  ])],
  controllers: [GestionMemoriaController],
  providers: [GestionMemoriaService]
})
export class GestionMemoriaModule {}
