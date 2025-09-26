import { Controller, Post, Body } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
    constructor(
        private readonly tokensService: TokensService,
    ) {}

    @Post('refresh')
    async refreshToken(@Body() dto){
        return this.tokensService.refreshToken(dto);
    }
}
