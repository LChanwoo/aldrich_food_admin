import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;


@Schema()
export class Product {

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