import { Customer } from '../../../domain/customer/entity/customer'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import { Address } from '../../../domain/customer/value-object/address'
import { FindCustomerUseCase } from './find.customer.usecase'

const customer = new Customer('123', 'Customer 1')
const address = new Address('street 1', 1, 'zip 1', 'city 1', 'state 1')
customer.changeAddress(address)

const mockRepository = (): CustomerRepositoryInterface => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = mockRepository()

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
