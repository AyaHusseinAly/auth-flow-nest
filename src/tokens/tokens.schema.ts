import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type TokenDocument= Token & Document;

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  hashedToken: string;

  @Prop({ default: Date.now, expires: '7d', required: true }) // auto-delete after 7 days
  createdAt: Date;

  @Prop({ required: true })
  deviceId: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
