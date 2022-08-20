import { Category } from "src/category/entities/category.entity";
import { Product } from "src/product/entities/product.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, IsNull, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
    OPEN = 'open',
    CLOSE = 'close',
    PENDING = 'pending'
}

@Entity({ synchronize: true, name: "auctions" })
export class Auction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    start_date: Date;

    @Column({ type: 'timestamp' })
    end_date: Date;

    @Column({ type: 'bool', default: true })
    show_document: boolean;

    @Column({ type: 'enum', enum: Status, default: Status.CLOSE })
    status: ['open', 'close', 'pending']

    @Column({ nullable: true })
    final_price: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product.auctions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    product: Product;


}
