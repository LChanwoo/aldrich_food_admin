import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {

    _id?: string;

    @Prop()
    email: string;
  
    @Prop()
    name: string;
  
    @Prop()
    password: string;
    
    @Prop({ default: "/img/team-1-800x800.jpg" })
    thumbnail?: string;

    @Prop({ default: Date.now })
    createdAt?: Date;

    @Prop()
    deletedAt?: Date;


}

export const UserSchema = SchemaFactory.createForClass(User);