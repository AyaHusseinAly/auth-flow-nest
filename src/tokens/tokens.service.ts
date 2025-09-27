import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument} from 'src/tokens/tokens.schema';
import * as bcrypt from 'bcrypt';
import type {Response} from 'express';

export type JwtPayload = {
    sub: string;   // userId
    email: string;
}

@Injectable()
export class TokensService {
    constructor(
        @InjectModel(Token.name) private tokensModel: Model<TokenDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async acquireTokens(userId: string, email:  string, deviceId: string) {
        const payload = { sub: userId, email: email };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });  
        this.storeTokenInDB(userId, refreshToken, deviceId);    
        return {accessToken, refreshToken};
    }

    async refreshToken(data: {deviceId: string},refreshToken: string) {
        const { deviceId} = data;
        const match = await this.compareTokens(refreshToken, deviceId);
        if(match){
            const {sub, email} = await this.getPayloadFromToken(refreshToken);
            return this.acquireTokens(sub , email, deviceId);
        }
        else
            throw new UnauthorizedException('Invalid or expired refresh token');

    }

    async hashToken(token: string): Promise<string> {
        return bcrypt.hash(token, 10); // 10 rounds of running hashing algorithm
    }

    async setAuthCookie(res: Response, refreshToken: string) {
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    async storeTokenInDB(userId:string, refreshToken: string, deviceId: string) {
        const hashedToken = await this.hashToken(refreshToken);
        return await this.tokensModel.create({ userId, hashedToken, deviceId });
    }

    async getTokenFromDB(deviceId: string) {
        return await this.tokensModel.find({ deviceId });
    }

    async compareTokens(refreshToken: string, deviceId: string){
        const tokenRecords = await this.getTokenFromDB(deviceId);
        return this.isTokenMatch(refreshToken, tokenRecords.map(row=>row.hashedToken));
    }

    async isTokenMatch(token: string, hashes: string[]): Promise<boolean> {
        for (const hash of hashes) {
          const match = await bcrypt.compare(token, hash);
          if (match) {
            return true;
          }
        }
        return false; // No matches found
    }

    async getPayloadFromToken(token: string):Promise<JwtPayload>{
        const payload = await this.jwtService.verifyAsync(token, {secret: this.configService.get<string>('JWT_SECRET')});
        return payload;
    }
}
