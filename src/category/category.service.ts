import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.insert({
      name: createCategoryDto.name,
      information: JSON.stringify(createCategoryDto.information),
      document: JSON.stringify(createCategoryDto.document)
    });;
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({id});
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id,{
      name: updateCategoryDto.name,
      information: JSON.stringify(updateCategoryDto.information),
      document: JSON.stringify(updateCategoryDto.document)
    });;
  }

  remove(id: number) {
    return this.categoryRepository.delete({id});
  }
}
