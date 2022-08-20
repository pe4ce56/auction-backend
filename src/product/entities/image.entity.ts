import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ synchronize: true, name: "images" })
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product.images,)
    product: Product;
}