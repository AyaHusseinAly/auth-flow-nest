import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './tokens.schema';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    SharedModule,
  ],
  controllers: [TokensController],
  providers: [TokensService],
  exports:[TokensService]
})
export class TokensModule {}
