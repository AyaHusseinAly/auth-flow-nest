import { Get, Controller, UseGuards, Req, Query, NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,

    ) {}

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Req() req: Request) {
        return req['user'];        
    }

    @Get()
    async findOneByEmail(@Query('email') email?: string) {
      if (!email) {
        throw new NotFoundException('Email query parameter is required');
      }
  
      const user = await this.usersService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
  
      return user;
    }


}
