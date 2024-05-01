import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { CreateCustomerUseCase } from './create.customer.usecase'

const customer = new Customer('123', 'Customer 1')
const address = new Address('street 1', 1, 'zip 1', 'city 1', 'state 1')
customer.changeAddress(address)

const mockRepository = (): any => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test create customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = mockRepository()

    const input = {
      name: 'Customer 1',
      address: {
        street: 'street 1',
        city: 'city 1',
        state: 'state 1',
        zip: 'zip 1',
        number: 1
      }
    }
    const useCase = new FindCustomerUseCase(customerRepository)

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

    const result = await useCase.execute(input)
    expect(result).toEqual(output)
  })

  it('should not find a customer', async () => {
    const customerRepository = mockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('customer not found')
    })

    const input = { id: '123' }
    const useCase = new FindCustomerUseCase(customerRepository)

    const promise = useCase.execute(input)
    expect(promise).rejects.toThrow('customer not found')
  })
})
