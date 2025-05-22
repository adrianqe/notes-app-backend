import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(data: { name: string }) {
    if (!data.name) {
      throw new BadRequestException('Name is required');
    }
    return this.prisma.category.create({ data });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async update(id: number, data: { name?: string }) {
    await this.findOne(id);
    return this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.prisma.category.delete({ where: { id } });
  }
}
