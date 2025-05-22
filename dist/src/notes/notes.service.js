"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NotesService = class NotesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (!data.title || !data.content) {
            throw new common_1.BadRequestException('Title and content are required');
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
            include: { tags: true, categories: true },
        });
    }
    async findAllArchived(q) {
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
    async update(id, data) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        const updateData = {};
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.content !== undefined)
            updateData.content = data.content;
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
    async archive(id) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return this.prisma.note.update({
            where: { id },
            data: { archived: true },
        });
    }
    async unarchive(id) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return this.prisma.note.update({
            where: { id },
            data: { archived: false },
        });
    }
    async delete(id) {
        const note = await this.prisma.note.findUnique({ where: { id } });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return this.prisma.note.delete({ where: { id } });
    }
    async findOne(id) {
        const note = await this.prisma.note.findUnique({
            where: { id },
            include: {
                tags: true,
                categories: true,
            },
        });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }
    async findByTagOrCategory(tagId, categoryId, q, archived) {
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
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotesService);
//# sourceMappingURL=notes.service.js.map