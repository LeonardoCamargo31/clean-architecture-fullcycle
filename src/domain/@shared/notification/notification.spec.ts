import { Notification } from './notification'

describe('unit test for notification', () => {
  it('should create errors', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer'
    }

    notification.addError(error)
    const output = notification.messages('customer')
    expect(output).toBe('customer: error message,')

    const error2 = {
      message: 'error message 2',
      context: 'customer'
    }

    notification.addError(error2)
    const output2 = notification.messages('customer')
    expect(output2).toBe('customer: error message,customer: error message 2,')

    const error3 = {
      message: 'error message 3',
      context: 'order'
    }

    notification.addError(error3)
    const output3 = notification.messages('customer')
    expect(output3).toBe('customer: error message,customer: error message 2,')

    const outputAllContexts = notification.messages()
    expect(outputAllContexts).toBe('customer: error message,customer: error message 2,order: error message 3,')
  })

  it('should check if notification has at least one error', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer'
    }
    notification.addError(error)
    const output = notification.hasErrors()
    expect(output).toBe(true)
  })

  it('should get all errors props', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer'
    }
    notification.addError(error)
    const output = notification.getErrors()
    expect(output).toEqual([error])
  })
})
