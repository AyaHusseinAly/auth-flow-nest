import { Get, Controller, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Req() req: Request) {
        return req['user'];        

    }


}
