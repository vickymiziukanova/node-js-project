import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskDetailsService } from './task-details.service';
import { AuthGuard } from '../guards/oauth2.guard';

@UseGuards(AuthGuard)
@Controller('task-details')
export class TaskDetailsController {
  constructor(private readonly taskDetailsService: TaskDetailsService) {}

  @Get()
  async getHello() {
    return this.taskDetailsService.getAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.taskDetailsService.findOneById(id);
  }

  @Post()
  async create(@Body() body: { taskId: string; additionalInfo: string }) {
    if (!body.taskId || !body.additionalInfo) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.taskDetailsService.createOrUpdateTaskDetails(
      Number(body.taskId),
      body.additionalInfo,
    );
    return { message: 'Task details created or updated successfully' };
  }
}
