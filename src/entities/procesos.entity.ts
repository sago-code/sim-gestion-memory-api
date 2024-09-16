import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Asignaciones } from "./asignaciones.entity";

@Entity({name:"procesos"})
export class Procesos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column("double")
    tamaño: number;

    @Column()
    unidad_medida: string;

    @Column()
    prioridad: number;

    @Column({type: 'tinyint'})
    estado: number;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    deletedAt?: Date;

    @OneToMany(() => Asignaciones, (asignaciones) => asignaciones.proceso)
    particiones: Asignaciones[];
}