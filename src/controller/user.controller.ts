import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationDto } from 'src/dto/request/authenticationDto';
import { UserRequestDto } from 'src/dto/request/userRequestDto';
import { APIResponse } from 'src/dto/response/APIResponse';
import { UserService } from 'src/service/user.service';
import { JwtAuthGuard } from '../config/jwt-auth-guard';
import { UserResponseDto } from '../dto/response/userResponseDto';

@Controller('api/user/')
export class UserController {
  constructor(private userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @Post('register')
  register(
    @Body() userRequestDto: UserRequestDto,
  ): Promise<APIResponse<string>> {
    this.logger.log('<< User register endpoint >>');
    return this.userService.register(userRequestDto);
  }

  @Post('login')
  login(
    @Body() authenticationDto: AuthenticationDto,
  ): Promise<APIResponse<string>> {
    this.logger.log('<< User login endpoint >>');
    return this.userService.login(authenticationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findById/:id')
  findById(@Param('id') id: number): Promise<APIResponse<UserResponseDto>> {
    this.logger.log('<< User find by id endpoint >>');
    return this.userService.findById(id);
  }
}
