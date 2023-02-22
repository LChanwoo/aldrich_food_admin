import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('home')
  @Get('/')
  public index() {
    return {};
  }  
  @Render('admin/dashboard')
  @Get('/admin/dashboard')
  public dashboard() {
    return {};
  }

  @Render('about')
  @Get('/about')
  public about() {
    return {};
  }
}
