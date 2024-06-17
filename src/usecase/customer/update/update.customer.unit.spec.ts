import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { UpdateCustomerUseCase } from './update.customer.usecase'

const customer = new Customer('123', 'Customer 1')
const address = new Address('street 1', 1, 'zip 1', 'city 1', 'state 1')
customer.changeAddress(address)

const mockRepository = (): any => {
  return {
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = mockRepository()

    const input = {
      id: customer.id,
      name: 'John updated',
      address: {
        street: 'street updated',
        city: 'city updated',
        state: 'state updated',
        zip: 'zip updated',
        number: 1234
      }
    }

    const useCase = new UpdateCustomerUseCase(customerRepository)
    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })
})
