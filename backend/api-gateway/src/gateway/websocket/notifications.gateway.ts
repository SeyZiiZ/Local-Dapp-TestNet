import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({ cors: true })
@Injectable()
export class NotificationsGateway {
    @WebSocketServer()
    server: Server;

    sendToAllClients(data: any) {
        this.server.emit('notification', data);
    }
}
