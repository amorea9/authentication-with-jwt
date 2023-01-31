import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  findAll(): string {
    return 'hello';
  }
}
