import { TagsService } from './tags.service';
export declare class TagsController {
    private tagsService;
    constructor(tagsService: TagsService);
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
