import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class TaskDetailsService {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async getAllTasks(): Promise<any> {
    const result = await this.pool.query('SELECT * FROM task_details');
    return result.rows;
  }

  async findOneById(id: string): Promise<any> {
    const result = await this.pool.query(
      '    SELECT \n' +
        '      task_details.*, \n' +
        '    FROM \n' +
        '      task_details\n' +
        '    WHERE \n' +
        '      task_details.id = $1',
      [id],
    );
    return result.rows[0];
  }

  async createOrUpdateTaskDetails(
    taskId: number,
    additionalInfo: string,
  ): Promise<void> {
    const existingTaskDetails = await this.pool.query(
      'SELECT * FROM task_details WHERE task_id = $1 LIMIT 1',
      [taskId],
    );

    if (existingTaskDetails.rowCount > 0) {
      // Update additional_info for the existing task_id
      await this.pool.query(
        'UPDATE task_details SET additional_info = $2 WHERE task_id = $1',
        [taskId, additionalInfo],
      );
    } else {
      // Insert a new row if task_id doesn't exist
      await this.pool.query(
        'INSERT INTO task_details (task_id, additional_info) VALUES ($1, $2)',
        [taskId, additionalInfo],
      );
    }
  }
}
