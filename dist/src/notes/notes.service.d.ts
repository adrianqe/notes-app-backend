import { PrismaService } from 'prisma/prisma.service';
export declare class NotesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        title: string;
        content: string;
        tagIds?: number[];
        categoryIds?: number[];
    }): Promise<{
        tags: {
            id: number;
            name: string;
        }[];
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllActive(): import(".prisma/client").Prisma.PrismaPromise<({
        tags: {
            id: number;
            name: string;
        }[];
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findAllArchived(q?: string): Promise<({
        tags: {
            id: number;
            name: string;
        }[];
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    update(id: number, data: {
        title?: string;
        content?: string;
        tagIds?: number[];
        categoryIds?: number[];
    }): Promise<{
        tags: {
            id: number;
            name: string;
        }[];
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    archive(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unarchive(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: number): Promise<{
        tags: {
            id: number;
            name: string;
        }[];
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByTagOrCategory(tagId?: number, categoryId?: number, q?: string, archived?: boolean): Promise<({
        tags: {
            id: number;
            name: string;
        }[];
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        archived: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
