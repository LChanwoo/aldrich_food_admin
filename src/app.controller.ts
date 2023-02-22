import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('/home')
  @Get('/')
  public index() {
    return {};
  }  
  @Render('admin/dashboard')
  @Get('/admin/dashboard')
  public dashboard() {
    return {};
  }

  @Render('admin/tables')
  @Get('/admin/tables')
  public tables() {
    return {};
  }

  @Render('auth/login')
  @Get('/auth/login')
  public login() {
    return {};
  }

  @Render('auth/register')
  @Get('/auth/register')
  public register() {
    return {};
  }

  @Render('about')
  @Get('/about')
  public about() {
    return {};
  }
}
