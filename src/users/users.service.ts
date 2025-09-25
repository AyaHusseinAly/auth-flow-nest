import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';


@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async createUser(dto: {email: string, hashedPassword: string, fullName: string}): Promise<UserDocument> {
        const { email, hashedPassword, fullName } = dto;
        try{
            return await this.userModel.create({ email, password: hashedPassword, fullName});
        }catch(err){
            this.logger.error('Error::createUser',err.message);
            if (err.code === 11000) {
                throw new ConflictException(`Email ${email} is already registered`);
            }
            throw new InternalServerErrorException('Unexpected database error');
        }

    }

    async findUserByEmail(email: string): Promise<UserDocument|null> {
        return this.userModel.findOne({ email }).exec();
    }
    

}
