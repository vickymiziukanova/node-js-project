import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskDetailsModule } from './task-details/task-details.module';

@Module({
  imports: [DatabaseModule, TasksModule, TaskDetailsModule],
})
export class AppModule {}
