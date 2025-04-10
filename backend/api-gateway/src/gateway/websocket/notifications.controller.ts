import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsGateway } from './notifications.gateway';

@Controller()
export class NotificationsController {
    constructor(private gateway: NotificationsGateway) { }

    @EventPattern('new-notification')
    handleNewNotification(@Payload() data: any) {
        this.gateway.sendToAllClients(data);
    }
}
