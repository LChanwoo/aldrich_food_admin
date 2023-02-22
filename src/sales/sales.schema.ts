import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose,{ HydratedDocument } from 'mongoose';
import { Product, ProductSchema } from './product.schema';

export type SalesDocument = HydratedDocument<Sales>;


@Schema()
export class Sales {

    _id: string;

    @Prop()
    buyer_name: string;
  
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];
  
    @Prop({ type: [Number], required: true })
    quantities: number[];

    @Prop()
    createdAt: Date;

    @Prop()
    cancelledAt?: Date;

    @Prop()
    get total(): number {
        let total = 0;
        for (let i = 0; i < this.products.length; i++) {
            total += +this.products[i].price * this.quantities[i];
        }
        return total;
    }
}

export const SalesSchema = SchemaFactory.createForClass(Sales);