import { Module } from '@nestjs/common';
import { GestionMemoriaController } from './gestion-memoria.controller';
import { GestionMemoriaService } from './gestion-memoria.service';

@Module({
  controllers: [GestionMemoriaController],
  providers: [GestionMemoriaService]
})
export class GestionMemoriaModule {}
