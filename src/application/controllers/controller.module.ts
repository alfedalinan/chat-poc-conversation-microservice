import { Module } from "@nestjs/common"
import { ServiceModule } from "../services/service.module"
import { ConversationController, MessageController } from "./"

@Module({
    controllers: [ConversationController, MessageController], // <--- add every new controller here
    imports: [ServiceModule]
})
export class ControllerModule {}