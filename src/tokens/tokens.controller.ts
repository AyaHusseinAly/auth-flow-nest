import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { refreshTokenDto } from './dto/refresh-token.dto';

@Controller('tokens')
export class TokensController {
    constructor(
        private readonly tokensService: TokensService,
    ) {}

    @Post('refresh')
    async refreshToken(@Body() dto: refreshTokenDto, @Req() req, @Res({ passthrough: true }) res){
        const oldRefreshToken = req.cookies['refresh_token'];
        const {accessToken, refreshToken} = await this.tokensService.refreshToken(dto, oldRefreshToken);
        await this.tokensService.setAuthCookie(res, refreshToken);
        return {accessToken};
    }
}
