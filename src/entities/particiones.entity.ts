import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Ajustes } from './ajustes.entity';

@Entity({name: 'particiones'})
export class Particiones {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tamaño: number;

    @ManyToOne(() => Ajustes, { nullable: false })
    @JoinColumn({ name: 'tipo_ajuste_id' })
    tipoAjuste: Ajustes;

    @Column({ type: 'tinyint' })
    estado: number;

    @Column()
    unidad_medida: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}