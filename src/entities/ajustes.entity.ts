import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Particiones } from "./particiones.entity";

@Entity({name: 'ajustes_de_memoria'})

export class Ajustes{

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    nombre: string

    @Column({type: 'varchar', length: 350})
    descripcion: string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date

    @Column({ type: 'datetime', nullable: true })
    deletedAt?: Date;

    
    @OneToMany(() => Particiones, (particion) => particion.tipoAjuste)
    particiones: Particiones[];
}