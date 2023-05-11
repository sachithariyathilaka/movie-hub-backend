import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../dto/response/APIResponse';
import { apiKey } from '../config/constant';

@Injectable()
export class MovieService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(MovieService.name);

  getMovieDataList(
    category: string,
    page: number,
  ): Observable<APIResponse<any>> {
    this.logger.log('<< Get movie data list service >>');
    const url =
      'https://api.themoviedb.org/3/movie/' +
      category +
      '?api_key=' +
      apiKey +
      '&language=en-US&page=' +
      page;
    return this.httpService.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        this.logger.log('<< Movie data list retrieved >>');
        return new APIResponse(
          HttpStatus.OK,
          'Movie data list retrieved!',
          axiosResponse.data,
        );
      }),
    );
  }
}
