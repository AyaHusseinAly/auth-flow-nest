import { Controller, Post, Body, Res } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { TokensService } from 'src/tokens/tokens.service';
import { SignoutDto } from './dto/signout.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly autService: AuthService,
        private readonly tokensService: TokensService
    )   {}

    @Post('signup')
    async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res) {
        const {accessToken, refreshToken} = await this.autService.signup(dto);
        await this.tokensService.setAuthCookie(res, refreshToken);
        return {accessToken};        
    }

    @Post('signin') 
    async signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res) {
        const {accessToken, refreshToken} = await this.autService.signin(dto);
        await this.tokensService.setAuthCookie(res, refreshToken);
        return {accessToken};
        
    }

    @Post('signout') 
    async signout(@Body() dto: SignoutDto, @Res({ passthrough: true }) res) {
        await this.tokensService.deleteTokenFromDB(dto.deviceId);
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        
        return { message: 'Signed out successfully' };;
        
    }

}
