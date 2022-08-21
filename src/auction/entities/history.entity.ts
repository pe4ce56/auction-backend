import { Category } from "src/category/entities/category.entity";
import { Product } from "src/product/entities/product.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, IsNull, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auction } from "./auction.entity";

@Entity({ synchronize: true, name: "histories" })
export class History extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @ManyToOne(() => Auction, (auction) => auction.histories, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    auction: Auction;

    @Column()
    user: number


}
