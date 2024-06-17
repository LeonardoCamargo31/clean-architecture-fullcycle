import { Customer } from '../../../domain/customer/entity/customer'
import { CustomerFactory } from '../../../domain/customer/factory/customer-factory'
import { Address } from '../../../domain/customer/value-object/address'
import { ListCustomerUseCase } from './list.customer.usecase'

const customer1 = CustomerFactory.createWithAddress('Customer 1', new Address('street 1', 1, 'zip 1', 'city 1', 'state 1'))
const customer2 = CustomerFactory.createWithAddress('Customer 2', new Address('street 2', 2, 'zip 2', 'city 2', 'state 2'))

const mockRepository = (): any => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test for listing customer use case', () => {
  it('should list a customer', async () => {
    const customerRepository = mockRepository()

    const useCase = new ListCustomerUseCase(customerRepository)
    const output = await useCase.execute(undefined)

    expect(output.customers.length).toEqual(2)
    expect(output.customers[0].id).toEqual(customer1.id)
    expect(output.customers[0].name).toEqual(customer1.name)
    expect(output.customers[0].address.street).toEqual(customer1.address.street)
    expect(output.customers[1].id).toEqual(customer2.id)
    expect(output.customers[1].name).toEqual(customer2.name)
    expect(output.customers[1].address.street).toEqual(customer2.address.street)
  })
})
