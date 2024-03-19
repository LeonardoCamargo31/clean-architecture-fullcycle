import { v4 as uuid } from 'uuid'
import { OrderFactory, OrderFactoryProps } from './order-factory'

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps: OrderFactoryProps = {
      id: uuid(),
      customerId: uuid(),
      items: [{
        id: uuid(),
        name: 'item 1',
        productId: uuid(),
        quantity: 1,
        price: 100
      }]
    }

    const order = OrderFactory.create(orderProps)
    expect(order.id).toEqual(orderProps.id)
    expect(order.customerId).toEqual(orderProps.customerId)
    expect(order.items.length).toBe(1)
  })
})
