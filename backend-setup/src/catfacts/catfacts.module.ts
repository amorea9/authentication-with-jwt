import { Module } from '@nestjs/common';
import { CatfactsController } from './catfacts.controller';
import { CatsFactService } from './catfacts.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CatfactsController],
  providers: [CatsFactService],
})
export class CatsFactsModule {}
