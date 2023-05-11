import { Controller, Get, Logger, Param } from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { Observable } from 'rxjs';
import { APIResponse } from '../dto/response/APIResponse';

@Controller('api/movie/')
export class MovieController {
  constructor(private movieService: MovieService) {}

  private readonly logger = new Logger(MovieController.name);

  @Get(':category/:page')
  getMovieDataList(
    @Param('category') category: string,
    @Param('page') page: number,
  ): Observable<APIResponse<any>> {
    this.logger.log('<< Get movie data list endpoint >>');
    return this.movieService.getMovieDataList(category, page);
  }
}
