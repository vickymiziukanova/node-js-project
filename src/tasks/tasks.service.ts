import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class TasksService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async createTask(
    name: string,
    description: string,
    startDate: string,
    finishDate: string,
  ): Promise<void> {
    await this.pool.query(
      'INSERT INTO tasks (name, description, start_date, finish_date) VALUES ($1, $2, $3, $4)',
      [name, description, startDate, finishDate],
    );
  }

  async getAllTasks() {
    const result = await this.pool.query('SELECT * FROM tasks');
    return result.rows;
  }
}
