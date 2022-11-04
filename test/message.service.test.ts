import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize'
import { MessageService } from '../src/application/services';
import { Message } from '../src/application/entities';
import { AppModule } from '../src/app.module';

describe('ConversationService', () => {
  let service: MessageService
  let id: number
  let messageModel: typeof Message

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([Message]),
        AppModule
      ],
      providers: [
        MessageService
      ]
    }).compile()

    service = module.get(MessageService)
    messageModel = module.get<typeof Message>(getModelToken(Message))
    await messageModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
                           .then(() => {
                            return messageModel.truncate({ cascade: true })
                           })
                           .then(() => {
                            return messageModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
                           })
  })

  afterAll(done => {
    done()
  })


  it('Get All Conversations By User ID', async () => {
    let toMemberId = 1
    const result = await service.getUnreadMessagesByDestinationUserId(toMemberId)
    expect(result.length).toBeGreaterThanOrEqual(0)
  })
})