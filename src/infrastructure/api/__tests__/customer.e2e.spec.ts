import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'john',
        address: {
          street: 'Street 1',
          number: 123,
          zip: '12345-678',
          city: 'São Paulo',
          state: 'SP'
        }
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('john')
    expect(response.body.address.street).toBe('Street 1')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('12345-678')
    expect(response.body.address.city).toBe('São Paulo')
    expect(response.body.address.state).toBe('SP')
  })

  it('should not create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'john'
      })

    expect(response.status).toBe(500)
  })
})
