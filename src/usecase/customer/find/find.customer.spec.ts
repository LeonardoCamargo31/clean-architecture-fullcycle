import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../../../infrastructure/customer/repository/sequelize/customer-model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer-repository'
import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { FindCustomerUseCase } from './find.customer.usecase'

describe('test find customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('street 1', 1, 'zip 1', 'city 1', 'state 1')
    customer.changeAddress(address)

    const customerRepository = new CustomerRepository()
    const customerCreated = await customerRepository.create(customer)

    const input = {
      id: '123'
    }
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const output = {
      id: '123',
      name: 'Customer 1',
      address: {
        street: 'street 1',
        city: 'city 1',
        state: 'state 1',
        zip: 'zip 1',
        number: 1
      }
    }

    const result = await findCustomerUseCase.execute(input)
    expect(result).toEqual(output)
  })
})
