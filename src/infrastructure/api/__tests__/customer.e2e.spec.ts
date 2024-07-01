import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('create', () => {
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

  describe('list', () => {
    it('should list all customer', async () => {
      const responseCreated = await request(app)
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

      expect(responseCreated.status).toBe(200)

      const listResponse = await request(app)
        .get('/customer')
        .set('Accept', 'application/json')
        .send()

      expect(listResponse.status).toBe(200)
      expect(listResponse.body.customers.length).toBe(1)

      const customer = listResponse.body.customers[0]
      expect(customer.name).toBe('john')
      expect(customer.address.street).toBe('Street 1')
      expect(customer.address.number).toBe(123)
      expect(customer.address.zip).toBe('12345-678')
      expect(customer.address.city).toBe('São Paulo')
      expect(customer.address.state).toBe('SP')

      const listResponseXML = await request(app)
        .get('/customer')
        .set('Accept', 'application/xml')
        .send()

      expect(listResponseXML.status).toBe(200)
      expect(listResponseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(listResponseXML.text).toContain('<customers>')
      expect(listResponseXML.text).toContain('<customer>')
      expect(listResponseXML.text).toContain('<name>john</name>')
      expect(listResponseXML.text).toContain('<address>')
      expect(listResponseXML.text).toContain('<street>Street 1</street>')
      expect(listResponseXML.text).toContain('<city>São Paulo</city>')
      expect(listResponseXML.text).toContain('<number>123</number>')
      expect(listResponseXML.text).toContain('<zip>12345-678</zip>')
      expect(listResponseXML.text).toContain('</address>')
      expect(listResponseXML.text).toContain('</customer>')
      expect(listResponseXML.text).toContain('</customers>')
    })
  })
})
