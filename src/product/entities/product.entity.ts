import { Category } from "src/category/entities/category.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, IsNull, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./image.entity";

@Entity({ synchronize: true,name: "items" })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;  

    @Column()
    price: string;  

    @Column()
    description: string;  

    @Column()
    information: string;  
    
    @Column()
    document: string;  

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
     updated_at: Date;

    @ManyToOne(() => Category, (category) => category.products,{
        cascade: true
    })
    @JoinTable()
    category: Category;

    @OneToMany(() => Image, (image) => image.product)
    @JoinTable()
    images: Image[];
}
