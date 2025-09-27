import { IsUUID } from "class-validator";

export class refreshTokenDto {

  @IsUUID()
  deviceId: string;

 
}