import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../guards/oauth2.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      description: string;
      startDate: string;
      finishDate: string;
    },
  ) {
    if (
      !body.name ||
      !body.description ||
      !body.startDate ||
      !body.finishDate
    ) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    await this.tasksService.createTask(
      body.name,
      body.description,
      body.startDate,
      body.finishDate,
    );
    return { message: 'Task created successfully' };
  }
}
