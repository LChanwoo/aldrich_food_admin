import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

// @Injectable()
// @WebSocketGateway({ namespace: 'ws-coin-price' })
// export class CoinPriceGateway implements OnGatewayConnection, OnGatewayDisconnect {

  // constructor(
  //   @Inject(CACHE_MANAGER) private cacheManager: Cache
  // ) {}

  // @WebSocketServer()
  // server: Server;

  // handleConnection(client: Socket, ...args: any[]) {
  //   console.log(`Client connected: ${client.id}`);
  //   // this.startCoinPriceSubscription(client);
  // }

  // handleDisconnect(client: Socket) {
  //   console.log(`Client disconnected: ${client.id}`);
  // }

  // startCoinPriceSubscription(client: Socket, ...args: any[]) {
  //   const interval = setInterval(async () => {
  //     const coinPrice = await this.cacheManager.get("mmprice")
  //     console.log( coinPrice )             
  //     client.emit('coinPriceUpdate', coinPrice);
  //   }, 3000);
  // }
// }
