import { PrismaService } from 'prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
    }>;
    update(id: number, data: {
        name?: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
    }>;
}
