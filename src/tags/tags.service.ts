// tag.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagsService {
    constructor(private prisma: PrismaService) { }

    async create(data: { name: string }) {
        if (!data.name) {
            throw new BadRequestException('Name is required');
        }
        return this.prisma.tag.create({ data });
    }

    findAll() {
        return this.prisma.tag.findMany();
    }

    async findOne(id: number) {
        const tag = await this.prisma.tag.findUnique({ where: { id } });
        if (!tag) throw new NotFoundException(`Tag with ID ${id} not found`);
        return tag;
    }

    async update(id: number, data: { name?: string }) {
        await this.findOne(id); // para validar existencia
        return this.prisma.tag.update({ where: { id }, data });
    }

    async delete(id: number) {
        await this.findOne(id); // para validar existencia
        return this.prisma.tag.delete({ where: { id } });
    }
}
