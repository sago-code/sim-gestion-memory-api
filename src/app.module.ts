import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestionMemoriaModule } from './gestion-memoria/gestion-memoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sim_gestion_memoria',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    GestionMemoriaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
