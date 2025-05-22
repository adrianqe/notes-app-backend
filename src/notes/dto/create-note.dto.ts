// src/notes/dto/create-note.dto.ts
import { IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateNoteDto {
    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    content!: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    tagIds?: number[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    categoryIds?: number[];
}
