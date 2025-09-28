import { IsUUID } from 'class-validator';

export class SignoutDto {
  @IsUUID()
  deviceId: string;
}