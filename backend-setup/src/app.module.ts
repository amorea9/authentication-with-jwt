import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsFactsModule } from './catfacts/catfacts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './auth/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CatsFactsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
