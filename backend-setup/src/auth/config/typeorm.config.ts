import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'alessiaamore',
  password: '',
  database: 'authusers',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

//this is how we connect to the database
