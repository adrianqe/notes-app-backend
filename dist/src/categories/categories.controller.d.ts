import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    create(body: {
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
    update(id: number, body: {
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
