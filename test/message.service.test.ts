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
  })

  afterAll(done => {
    messageModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
    done()
  })

  it('Create Message', async () => {
    let data = {
      conversationId: 1,
      uuid: '12345-abcde-xyxyxy',
      fromMemberId: 1,
      toMemberId: 2,
      text: 'Hi! This is my first message!',
      status: 0
    }

    let result = await service.create(data)

    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
  })

  it('Get All Conversations By User ID', async () => {
    let toMemberId = 1
    const result = await service.getUnreadMessagesByDestinationUserId(toMemberId)
    expect(result.length).toBeGreaterThanOrEqual(0)
  })

  it('Update To Delivered Using UUID', async () => {
    let uuid = '12345-abcde-xyxyxy'
    const result = await service.updateToDeliveredByUuid(uuid)

    expect(result.length).toBeGreaterThan(0)
  })
})