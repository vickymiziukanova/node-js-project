import { Module } from '@nestjs/common';
import { TaskDetailsService } from './task-details.service';
import { TaskDetailsController } from './task-details.controller';

@Module({
  controllers: [TaskDetailsController],
  providers: [TaskDetailsService],
  exports: [TaskDetailsService],
})
export class TaskDetailsModule {}
