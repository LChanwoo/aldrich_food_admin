import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose,{ HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;


@Schema()
export class Product {
    @Prop({ default: new mongoose.Types.ObjectId() })
    _id: string;

    @Prop()
    name: string;
  
    @Prop()
    price: number[];

    @Prop()
    inventory: number[];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    cancledAt?: Date;

  
}

export const ProductSchema = SchemaFactory.createForClass(Product);