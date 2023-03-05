import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Cache } from 'cache-manager';
@Injectable()
export class TaskService {
    private readonly logger = new Logger();
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    // @Cron('0 1 0 * * * ')
    @Cron('0 */1 * * * * ')
    async getCoinPricehr() {
        console.log("1분지남, axios 가즈아ㅏㅏㅏ")
        const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30',{
            headers: {
                Authorization : "Apikey b3b6556a3ed262a12d39414d6448d12e0db39d4c697cf14c9e0b5cea2f311e23"
            }
        })
        const responseData = response.data
        // console.log(responseData.Data.Data)
        const OHCLV = responseData.Data.Data.map((item) => {
            return {
                time: item.time*1000,
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close,
            }
        })
        console.log(OHCLV)
        return await this.cacheManager.set("mmprice",OHCLV)
        console.log("캐시에 저장완료")
        // const cache = await this.cacheManager.get("hrCoinPrice")
        // console.log("캐시에 저장된 값", cache)

    }
 }
