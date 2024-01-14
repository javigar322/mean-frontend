import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  
  constructor() {
    const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
    super(config);
  }

  listen = () => {
    this.ioSocket.on('connect', () => {
      console.log('connected');
    });
  }

}
