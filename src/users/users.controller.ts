import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto, UpdateUserDto } from 'src/dtos/users.dtos';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly emitter: EventEmitter2,
  ) {}

  @Get()
  @ApiOkResponse({ type: [UserDto] })
  async getAll() {
    return await this.userService.getAllUsers();
  }

  @Get('/me')
  @ApiOkResponse({ type: UserDto })
  getMe(@Request() request: any) {
    return request.user;
  }

  @Put('/me')
  @ApiOkResponse({ type: UserDto })
  async updateMe(@Request() request: any, @Body() updates: UpdateUserDto) {
    this.emitter.emit('auth.cache.clear', { user: request.user.externalId });
    return this.userService.updateUser(request.user.id, updates);
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  async getOne(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      if (user) return user;
      else throw '';
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
