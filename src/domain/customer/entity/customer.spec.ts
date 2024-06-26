import { Address } from '../value-object/address'
import { Customer } from './customer'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'John')
    }).toThrowError('customer: id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrowError('customer: name is required')
  })

  it('should throw error when name and id are empty', () => {
    expect(() => {
      const customer = new Customer('', '')
    }).toThrowError('customer: id is required,customer: name is required')
  })

  it('should change name', () => {
    // arrange
    const customer = new Customer('123', 'John')
    // act
    customer.changeName('Jane')
    // assert
    expect(customer.name).toBe('Jane')
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'John')
    const address = new Address('Street 1', 123, '12345-678', 'São Paulo', 'SP')
    customer.changeAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'John')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('should throw error when address is undefined', () => {
    const customer = new Customer('123', 'John')
    expect(() => customer.activate()).toThrowError('address is mandatory to activate a customer')
  })

  it('should add reward points', () => {
    const customer = new Customer('123', 'John')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(20)
    expect(customer.rewardPoints).toBe(30)
  })
})
