import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(data: CreateNoteDto): Promise<{
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
    findByTagOrCategory(tagId?: string, categoryId?: string, q?: string, archived?: string): Promise<({
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
    update(id: number, data: UpdateNoteDto): Promise<{
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
}
