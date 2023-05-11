import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/controller/app.controller';
import { User } from 'src/entity/user';
import { AppService } from 'src/service/app.service';
import { UserModule } from './user.module';
import { MovieModule } from './movie.module';

@Module({
  imports: [
    UserModule,
    MovieModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'movie_hub',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
