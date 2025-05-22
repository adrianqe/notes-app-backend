import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) { }

    @Post()
    create(@Body() body: { name: string }) {
        return this.tagsService.create(body);
    }

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tagsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: { name?: string }) {
        return this.tagsService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.tagsService.delete(id);
    }
}
