import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sales } from './sales.schema';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sales.name) private salesModel: Model<Sales>) {}

  async getMonthlySales() {
    return await this.salesModel
      .aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            total: { $sum: '$total' },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            total: 1,
          },
        },
        {
          $sort: {
            year: 1,
            month: 1,
          },
        },
      ])
      .exec();
  }


  async getMonthlySales2() {
    const year = new Date().getFullYear();
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);
    return await this.salesModel
      .aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lt: end }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            total: { $sum: '$total' },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            total: 1,
          },
        },
        {
          $sort: {
            year: 1,
            month: 1,
          },
        },
      ])
      .exec();
  }
}
