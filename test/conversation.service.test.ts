import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize'
import { ConversationService } from '../src/application/services';
import { Conversation } from '../src/application/entities';
import { AppModule } from '../src/app.module';

describe('ConversationService', () => {
  let service: ConversationService
  let id: number
  let conversationModel: typeof Conversation

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([Conversation]),
        AppModule
      ],
      providers: [
        ConversationService
      ]
    }).compile()

    service = module.get(ConversationService)
    conversationModel = module.get<typeof Conversation>(getModelToken(Conversation))
    await conversationModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
                           .then(() => {
                            return conversationModel.truncate({ cascade: true })
                           })
                           .then(() => {
                            return conversationModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
                           })
  })

  afterAll(done => {
    done()
  })

  it('Create Conversation', async () => {
    const result = await service.create({
      name: 'My Conversation',
      userId: 1,
      userRegister: '123456-poiuytr-xxxxx'
    })
    
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(typeof result.id).toBe('number')
    expect(result.id).toBeGreaterThan(0)

    id = result.id

  })

  it('Get All Conversations By User ID', async () => {
    let userId = 1
    const result = await service.getAllByUserId(userId)
    expect(result.length).toBeGreaterThanOrEqual(0)
  })

  it('Find Conversation By Id', async() => {
    const result = await service.getById(id)
    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
  })

  it('Update Conversation', async() => {
    let userId = 1
    let userRegister = '123456-uvefgh-xgtgsd'
    const result = await service.update(id, {
      name: 'My Updated Conversation',
      userId,
      userRegister
    })

    expect(result.length).toBeTruthy()
    expect(result[0]).toBeTruthy()
    expect(typeof result[0]).toBe('number')
    expect(result[0]).toBeGreaterThanOrEqual(0)
  })

  it('Delete Conversation', async () => {
    const result = await service.remove(id)

    expect(result).toBeTruthy()
    expect(typeof result).toBe('number')
    expect(result).toBeGreaterThanOrEqual(0)
  })
});
