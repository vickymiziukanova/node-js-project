import { Test, TestingModule } from '@nestjs/testing';
import { TaskDetailsController } from './task-details.controller';
import { TaskDetailsService } from './task-details.service';
import { AuthGuard } from '../guards/oauth2.guard';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TaskDetailsController', () => {
  let controller: TaskDetailsController;
  let service: TaskDetailsService;

  // Mocked TaskDetailsService
  const mockTaskDetailsService = {
    getAllTasks: jest.fn(),
    findOneById: jest.fn(),
    createOrUpdateTaskDetails: jest.fn(),
  };

  // Mock AuthGuard
  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskDetailsController],
      providers: [
        {
          provide: TaskDetailsService,
          useValue: mockTaskDetailsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<TaskDetailsController>(TaskDetailsController);
    service = module.get<TaskDetailsService>(TaskDetailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /task-details', () => {
    it('should return all task details', async () => {
      const mockTasks = [{ id: 1, name: 'Test Task' }];
      mockTaskDetailsService.getAllTasks.mockResolvedValue(mockTasks);

      const result = await controller.getHello();

      expect(result).toEqual(mockTasks);
      expect(service.getAllTasks).toHaveBeenCalled();
    });
  });

  describe('GET /task-details/:id', () => {
    it('should return task details for a valid id', async () => {
      const mockTask = { id: 1, name: 'Test Task' };
      mockTaskDetailsService.findOneById.mockResolvedValue(mockTask);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockTask);
      expect(service.findOneById).toHaveBeenCalledWith('1');
    });

    it('should throw a Forbidden exception if id is not provided', async () => {
      await expect(controller.findOne('')).rejects.toThrowError(
        new HttpException('Forbidden', HttpStatus.FORBIDDEN),
      );
    });
  });

  describe('POST /task-details', () => {
    it('should create or update task details', async () => {
      const body = { taskId: '1', additionalInfo: 'Some info' };
      mockTaskDetailsService.createOrUpdateTaskDetails.mockResolvedValue('');

      const result = await controller.create(body);

      expect(result).toEqual({
        message: 'Task details created or updated successfully',
      });
      expect(service.createOrUpdateTaskDetails).toHaveBeenCalledWith(
        1,
        'Some info',
      );
    });

    it('should throw a Forbidden exception if taskId or additionalInfo is missing', async () => {
      const invalidBody = { taskId: '', additionalInfo: '' };

      await expect(controller.create(invalidBody)).rejects.toThrowError(
        new HttpException('Forbidden', HttpStatus.FORBIDDEN),
      );
    });
  });
});
