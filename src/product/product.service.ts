import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Image } from './entities/image.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) { }
  create(product: any) {
    return this.productRepository.save(product)
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category', 'images'] });
  }
  findByCategory(category: number): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'images'],
      where: {
        category: {
          id: category
        }
      }
    })
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      relations: ['category', 'images'],
      where: {
        id
      },
    });
  }


  async removeImage(id: number) {
    return await this.imageRepository.delete(id)
  }

  update(id: number, product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
