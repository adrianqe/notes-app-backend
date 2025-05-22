import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) { }

    async create(data: { title: string; content: string; tagIds?: number[]; categoryIds?: number[] }) {
        if (!data.title || !data.content) {
            throw new BadRequestException('Title and content are required');
        }

        return this.prisma.note.create({
            data: {
                title: data.title,
                content: data.content,
                archived: false,
                tags: data.tagIds
                    ? {
                        connect: data.tagIds.map(id => ({ id })),
                    }
                    : undefined,
                categories: data.categoryIds
                    ? {
                        connect: data.categoryIds.map(id => ({ id })),
                    }
                    : undefined,
            },
            include: {
                tags: true,
                categories: true,
            },
        });
    }

    findAllActive() {
        return this.prisma.note.findMany({
            where: { archived: false },
            include: { tags: true, categories: true }, // incluir relaciones para consistencia
        });
    }

    async findAllArchived(q?: string) {
        return this.prisma.note.findMany({
            where: {
                archived: true,
                ...(q && {
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                        { content: { contains: q, mode: 'insensitive' } },
                    ],
                }),
            },
            include: { tags: true, categories: true },
        });
    }


    async update(
        id: number,
        data: { title?: string; content?: string; tagIds?: number[]; categoryIds?: number[] } // renombré tags y categories por tagIds y categoryIds para que coincida con create
    ) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }

        const updateData: any = {};
        if (data.title !== undefined) updateData.title = data.title;
        if (data.content !== undefined) updateData.content = data.content;

        if (data.tagIds) {
            updateData.tags = {
                set: data.tagIds.map(tagId => ({ id: tagId })),
            };
        }

        if (data.categoryIds) {
            updateData.categories = {
                set: data.categoryIds.map(catId => ({ id: catId })),
            };
        }

        return this.prisma.note.update({
            where: { id },
            data: updateData,
            include: {
                tags: true,
                categories: true,
            },
        });
    }

    async archive(id: number) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }

        return this.prisma.note.update({
            where: { id },
            data: { archived: true },
        });
    }

    async unarchive(id: number) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }

        return this.prisma.note.update({
            where: { id },
            data: { archived: false },
        });
    }

    async delete(id: number) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }

        return this.prisma.note.delete({ where: { id } });
    }

    async findOne(id: number) {
        const note = await this.prisma.note.findUnique({
            where: { id },
            include: {
                tags: true,
                categories: true,
            },
        });

        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }

        return note;
    }

    async findByTagOrCategory(tagId?: number, categoryId?: number, q?: string, archived?: boolean) {
        return this.prisma.note.findMany({
            where: {
                ...(archived !== undefined && { archived }),
                ...(tagId && {
                    tags: {
                        some: { id: tagId },
                    },
                }),
                ...(categoryId && { categoryId }),
                ...(q && {
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                        { content: { contains: q, mode: 'insensitive' } },
                    ],
                }),
            },
            include: {
                tags: true,
                categories: true,
            },
        });
    }


}
