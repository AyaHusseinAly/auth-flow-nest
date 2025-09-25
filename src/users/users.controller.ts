import { Post, Body, Controller, UseGuards, Req } from '@nestjs/common';
import { userProfileDto } from './dto/user-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    @UseGuards(AuthGuard)
    @Post('profile')
    async profile(@Body() dto: userProfileDto, @Req() req: Request) {
        return req['user'];        

    }


}
