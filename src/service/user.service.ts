import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequestDto } from 'src/dto/request/userRequestDto';
import { APIResponse } from 'src/dto/response/APIResponse';
import { User } from 'src/entity/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from 'src/dto/request/authenticationDto';
import { UserResponseDto } from '../dto/response/userResponseDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async register(userRequestDto: UserRequestDto): Promise<APIResponse<string>> {
    this.logger.log('<< User register service >>');
    await this.validateInput(userRequestDto);
    const newUser = new User();
    newUser.email = userRequestDto.email;
    newUser.username = userRequestDto.username;
    newUser.password = await bcrypt.hash(userRequestDto.password, 12);
    newUser.createdDate = new Date();
    newUser.modifiedDate = new Date();
    newUser.createdUser = userRequestDto.username;
    newUser.modifiedUser = userRequestDto.username;
    newUser.fullName = userRequestDto.fullName;

    const data = this.userRepository.save(newUser);
    if (data == null) {
      this.logger.error(
        '<< Cannot register the user. Please try again later >>',
      );
      throw new HttpException(
        'Cannot register the user. Please try again later!',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.logger.log('<< User registered successfully >>');
    return new APIResponse(HttpStatus.OK, 'User registered successfully!', '');
  }

  async login(
    authenticationDto: AuthenticationDto,
  ): Promise<APIResponse<string>> {
    this.logger.log('<< User login service >>');
    const user = this.userRepository.findOne({
      where: { username: authenticationDto.username },
    });

    if (user == null) {
      this.logger.error('<< Invalid credentials >>');
      throw new HttpException('Invalid credentials!', HttpStatus.BAD_REQUEST);
    }

    if (
      !(await bcrypt.compare(authenticationDto.password, (await user).password))
    ) {
      this.logger.error('<< Invalid credentials >>');
      throw new HttpException('Invalid credentials!', HttpStatus.BAD_REQUEST);
    }

    const jwt = this.jwtService.sign({
      email: (await user).email,
      id: (await user).id,
    });
    this.logger.log('<< User authenticated >>');
    return new APIResponse<string>(HttpStatus.OK, 'User authenticated!', jwt);
  }

  async validateInput(userRequestDto: UserRequestDto) {
    // validate two passwords
    if (userRequestDto.password != userRequestDto.repeatPassword) {
      this.logger.error('<< Two passwords not matching >>');
      throw new HttpException(
        'Two passwords are not matching!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // validate email validity
    const user = await this.userRepository.findOne({
      where: { email: userRequestDto.email },
    });

    if (user) {
      this.logger.error('<< User already exists >>');
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: number): Promise<APIResponse<UserResponseDto>> {
    this.logger.log('<< User find by id service >>');
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      this.logger.error('<< Cannot find the user >>');
      throw new HttpException('Cannot find the user!', HttpStatus.BAD_REQUEST);
    }

    const data = new UserResponseDto();
    data.email = user.email;
    data.username = user.username;
    data.fullName = user.fullName;
    this.logger.log('<< User data retrieved >>');
    return new APIResponse<UserResponseDto>(
      HttpStatus.OK,
      'User data retrieved!',
      data,
    );
  }
}
