import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly autService: AuthService)   {}

    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        return this.autService.signup(dto);
        
    }

    @Post('signin') 
    async signin(@Body() dto: SigninDto) {
        return this.autService.signin(dto);
    }
}
