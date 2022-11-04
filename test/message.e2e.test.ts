import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { SequelizeModule, getModelToken } from '@nestjs/sequelize'
import { Message } from '../src/application/entities'

describe('MessageController', () => {
  let app: INestApplication
  let messageModel: typeof Message

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([Message]),
        AppModule
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    messageModel = moduleFixture.get(getModelToken(Message))
    await messageModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
                           .then(() => {
                            return messageModel.truncate({ cascade: true })
                           })
                           .then(() => {
                            return messageModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
                           })
    await app.init()
  })

  afterAll(done => done())

  it('/messages/unread/to-member-id/{:toMemberId} (GET)', () => {
    let toMemberId = 1
    return request(app.getHttpServer())
      .get(`/messages/unread/to-member-id/${toMemberId}`)
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(0)
      })
  })
})
