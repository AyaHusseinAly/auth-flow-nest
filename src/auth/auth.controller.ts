import { Controller, Post, Body, Res } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly autService: AuthService)   {}

    @Post('signup')
    async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const {accessToken, refreshToken} = await this.autService.signup(dto);
        await this.autService.setAuthCookie(res, refreshToken);
        return {accessToken};        
    }

    @Post('signin') 
    async signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res: Response) {
        const {accessToken, refreshToken} = await this.autService.signin(dto);
        await this.autService.setAuthCookie(res, refreshToken);
        return {accessToken};
        
    }

}
