import { IsString } from "class-validator";

export class userProfileDto {

  @IsString()
  userId: string;
 
}