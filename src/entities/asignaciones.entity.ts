import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Procesos } from "./procesos.entity";
import { Particiones } from "./particiones.entity";

@Entity({name:"asignaciones"})

export class Asignaciones {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Procesos, { nullable: false })
    @JoinColumn({ name: 'proceso_id' })
    proceso: Procesos;

    @ManyToOne(() => Particiones, { nullable: false })
    @JoinColumn({ name: 'particion_id' })
    particion: Particiones;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}
