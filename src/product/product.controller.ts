import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public, Roles } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ImageAbstract } from 'src/common/Abstraction/ProductAbsctraction';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import { Image } from './entities/image.entity';
import { Category } from 'src/category/entities/category.entity';

@ApiBearerAuth()
@Controller('product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles('admin')
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    let images = [];
    for (let i in createProductDto.images) {
      const image = new Image
      image.name = await bcrypt.hash(createProductDto.name + Date.now(), 8) + ".jpg"
      images.push(image)
    }
    const product = {
      ...createProductDto,
      information: JSON.stringify(createProductDto.information),
      document: JSON.stringify(createProductDto.document),
      images,
    }
    return this.productService.create(product);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get("/category/:category")
  async findByCategory(@Param('category') category: number) {
    const product = await this.productService.findByCategory(category)
    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
    return product
  }


  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id)
    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
    return product
  }

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.findOne(+id)
    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
    product.name = updateProductDto.name
    product.price = updateProductDto.price.toString()
    product.description = updateProductDto.description
    product.information = JSON.stringify(updateProductDto.information)
    product.document = JSON.stringify(updateProductDto.document)
    product.category.id = updateProductDto.category

    //check removed image
    let index = []
    for (let j in product.images) {
      let found = false;
      for (let i in updateProductDto.images) {
        if (product.images[j].name === updateProductDto.images[i].name) {
          found = true;
          break;
        }
      }

      if (!found) {
        index.push(j)
      }
    }
    for (let j of index) {
      this.productService.removeImage(product.images[j].id)
      product.images.splice(product.images.indexOf(product.images[j]), 1)
    }

    //check new image
    for (let i in updateProductDto.images) {
      let found = false
      for (let j in product.images) {
        if (product.images[j].name === updateProductDto.images[i].name) {
          found = true
          break;
        }
      }

      if (!found) {
        const image = new Image
        image.name = await bcrypt.hash(updateProductDto.name + Date.now(), 8) + ".jpg"
        product.images.push(image)
      }
    }

    return this.productService.update(+id, product)
  }


  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
