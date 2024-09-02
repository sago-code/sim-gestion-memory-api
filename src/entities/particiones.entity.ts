import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Ajustes } from './ajustes.entity';  // Importa la entidad Ajustes

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

    @Column({nullable: true ,type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    deletedAt: Date;
}