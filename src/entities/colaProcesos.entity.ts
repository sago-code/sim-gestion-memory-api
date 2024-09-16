import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Procesos } from "./procesos.entity";

@Entity({name: "cola_procesos"})
export class ColaProcesos {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Procesos, { nullable: false })
    @JoinColumn({ name: 'proceso_id' })
    proceso: Procesos;

    @Column()
    prioridad: number;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}