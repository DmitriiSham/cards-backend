// Файл: src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(longId: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ longId });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(
    longId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const product = await this.findOne(longId);
    if (!product) {
      return null;
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(longId: number): Promise<boolean> {
    const result = await this.productRepository.delete({ longId });
    return !!result.affected;
  }
}
