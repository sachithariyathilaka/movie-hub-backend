import { Module } from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { MovieController } from '../controller/movie.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
