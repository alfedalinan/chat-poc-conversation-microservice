import { Module } from "@nestjs/common"
import { ServiceModule } from "../services/service.module"
import { UserController as ConversationController } from "./"

@Module({
    controllers: [ConversationController], // <--- add every new controller here
    imports: [ServiceModule]
})
export class ControllerModule {}