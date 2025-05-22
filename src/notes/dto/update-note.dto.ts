import { IsOptional, IsNotEmpty, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class UpdateNoteDto {
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    content?: string;

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
