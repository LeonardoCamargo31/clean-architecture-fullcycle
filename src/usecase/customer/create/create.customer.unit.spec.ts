import { CreateCustomerUseCase } from './create.customer.usecase'

const mockRepository = (): any => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test create customer use case', () => {
  it('should create a customer', async () => {
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

    const useCase = new CreateCustomerUseCase(customerRepository)
    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        state: input.address.state,
        zip: input.address.zip,
        number: input.address.number
      }
    })
  })

  it('should thrown an error when name is missing', async () => {
    const customerRepository = mockRepository()

    const input = {
      name: '',
      address: {
        street: 'street 1',
        city: 'city 1',
        state: 'state 1',
        zip: 'zip 1',
        number: 1
      }
    }

    const useCase = new CreateCustomerUseCase(customerRepository)

    await expect(useCase.execute(input)).rejects.toThrow('name is required')
  })
})
