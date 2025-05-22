import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    // Crear una nota con tags y categorías
    @Post()
    create(@Body() data: CreateNoteDto) {
        return this.notesService.create(data);
    }

    // Listar notas por tag o categoría
    @Get()
    findByTagOrCategory(
        @Query('tagId') tagId?: string,
        @Query('categoryId') categoryId?: string,
        @Query('q') q?: string,
        @Query('archived') archived?: string, // ← nuevo parámetro
    ) {
        const tag = tagId ? parseInt(tagId) : undefined;
        const category = categoryId ? parseInt(categoryId) : undefined;
        const isArchived = archived === 'true' ? true : archived === 'false' ? false : undefined;
        return this.notesService.findByTagOrCategory(tag, category, q, isArchived);
    }



    // Obtener todas las notas activas
    @Get('active')
    findAllActive() {
        return this.notesService.findAllActive();
    }

    // Obtener todas las notas archivadas
    @Get('archived')
    findAllArchived(@Query('q') q?: string) {
        return this.notesService.findAllArchived(q);
    }


    // Obtener una nota por su ID
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.notesService.findOne(id);
    }

    // Actualizar una nota
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateNoteDto,
    ) {
        return this.notesService.update(id, data);
    }

    // Archivar una nota
    @Patch(':id/archive')
    archive(@Param('id', ParseIntPipe) id: number) {
        return this.notesService.archive(id);
    }

    // Desarchivar una nota
    @Patch(':id/unarchive')
    unarchive(@Param('id', ParseIntPipe) id: number) {
        return this.notesService.unarchive(id);
    }

    // Eliminar una nota
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.notesService.delete(id);
    }
}
