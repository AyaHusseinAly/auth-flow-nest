import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument} from 'src/tokens/tokens.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokensService {
    constructor(
        @InjectModel(Token.name) private tokensModel: Model<TokenDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async acquireTokens(userId: string, email:  string, deviceId: string) {
        const payload = { sub: userId, email: email };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });  
        this.storeToken(userId, refreshToken, deviceId);    
        return {accessToken, refreshToken};
    }

    async refreshToken(data: {userId: string, email:  string, deviceId: string}) {
        // Future: check refresh token first (compare to DB stored one)
        const {userId, email, deviceId} = data;
        return this.acquireTokens(userId , email, deviceId);
    }

    async storeToken(userId:string, refreshToken: string, deviceId: string) {
        const hashedToken = await this.hashToken(refreshToken);
        return await this.tokensModel.create({ userId, hashedToken, deviceId });
    }

    async hashToken(token: string): Promise<string> {
        return bcrypt.hash(token, 10); // 10 rounds of running hashing algorithm
    }
}
