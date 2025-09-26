import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserDocument } from 'src/users/user.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    )   {}

    async signin(dto: SigninDto) {
        const user: UserDocument|null = await this.usersService.findUserByEmail(dto.email);
        if(!user) 
            throw new UnauthorizedException('Invalid Email')

        const isMatched = await this.comparePasswords(dto.password, user.password)
        if(!isMatched)
            throw new UnauthorizedException('Invalid Credentials');

        return this.acquireTokens(user.id as string, user.email);
    }

    async signup(dto: SignupDto) {
        const hashedPassword = await this.hashPassword(dto.password);
        const user = await this.usersService.createUser({...dto, hashedPassword});
        return this.acquireTokens(user.id as string, user.email);
    }


    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async acquireTokens(userId: string, email:  string){
        const payload = { sub: userId, email: email };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });      
        return {accessToken, refreshToken};
    }

    async refreshToken(refreshToken: string){
        return refreshToken;
    }

    async setAuthCookie(res: Response, refreshToken: string) {
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
}
