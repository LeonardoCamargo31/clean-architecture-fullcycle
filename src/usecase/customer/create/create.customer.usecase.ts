import { Customer } from '../../../domain/customer/entity/customer'
import { CustomerFactory } from '../../../domain/customer/factory/customer-factory'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import { Address } from '../../../domain/customer/value-object/address'
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from './create.customer.dto'
import { v4 as uuid } from 'uuid'

export class CreateCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface

  constructor (customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const customerId = uuid()
    const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city, input.address.state)
    const customer = CustomerFactory.createWithAddress(input.name, address)

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
        state: customer.address.state
      }
    }
  }
}
