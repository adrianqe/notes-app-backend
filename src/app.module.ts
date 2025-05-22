import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from 'prisma/prisma.module';  // Importa el PrismaModule

@Module({
  imports: [
    PrismaModule,
    NotesModule,
    TagsModule,
    CategoriesModule,
  ],

})
export class AppModule { }
