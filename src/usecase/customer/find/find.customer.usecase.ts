import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository.interface'
import { InputFindCustomerDTO, OutputFindCustomerDTO } from './find.customer.dto'

export class FindCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface

  constructor (customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
        zip: customer.address.zip,
        number: customer.address.number
      }
    }
  }
}
