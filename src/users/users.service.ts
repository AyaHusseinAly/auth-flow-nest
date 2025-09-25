import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async createUser(dto: CreateUserDto): Promise<UserDocument> {
        const { email, hashedPassword, fullName } = dto;
        const user = new this.userModel({ email, password: hashedPassword, fullName});
        return user.save();

    }

    async findUserByEmail(email: string): Promise<UserDocument|null> {
        return this.userModel.findOne({ email }).exec();
    }
    

}
