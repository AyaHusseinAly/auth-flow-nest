import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserDocument } from 'src/users/user.schema';

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
            return new UnauthorizedException('Invalid Credentials');

        const payload = { sub: user.id, email: user.email };

        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        // const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
        // await this.tokenService.updateRefreshToken(user._id, refreshToken);
      
        return {accessToken};

        return user;
    }

    async signup(dto: SignupDto) {
        const hashedPassword = await this.hashPassword(dto.password);
        return this.usersService.createUser({...dto, hashedPassword});

    }


    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
