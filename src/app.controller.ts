import { CACHE_MANAGER,Controller, Get, Inject, Query, Render } from '@nestjs/common';
import {Cache}  from 'cache-manager'
import { from, toArray } from 'rxjs';
@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}
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

  @Render('admin/coin_price')
  @Get('/admin/tables2')
  public async tables() {
    console.log("얍삐")
    const coinPrice = await this.cacheManager.get("mmprice")
    return { data:coinPrice };
    return {data:"ss"};
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

  @Get('api/one')
  public about() {
    return { message: 'Hello World!' };
  }
  @Get("/cache")
  async getCache(@Query('id') id : string ): Promise<any> {
    const savedTime = await this.cacheManager.get("ms")
    if( savedTime ){
      return "saved time : " + savedTime
    }
    const now = new Date().getTime()
    await this.cacheManager.set('ms',now);
    return "save new time : " + now
    // const savedTime = await this.cacheManager.get("mmprice")
    return savedTime
  }

    @Get("/api/coin_price")
    async getCoinPrice() {
      console.log("얍삐")
      return from(this.cacheManager.get("mmprice")).pipe(toArray());

    }
  
}
