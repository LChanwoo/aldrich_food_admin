import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('/monthly')
  async getMonthlySales() {
    return await this.salesService.getMonthlySales();
  }
}