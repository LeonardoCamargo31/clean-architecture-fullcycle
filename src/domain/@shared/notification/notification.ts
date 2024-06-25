export interface NotificationErrorProps {
  message: string
  context: string
}

export class Notification {
  private readonly errors: NotificationErrorProps[]

  constructor () {
    this.errors = []
  }

  addError (error: NotificationErrorProps): void {
    this.errors.push(error)
  }

  getErrors (): NotificationErrorProps[] {
    return this.errors
  }

  hasErrors (): boolean {
    return this.errors.length > 0
  }

  messages (context?: string): string {
    let message = ''

    this.errors.forEach((error) => {
      if (context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`
      }
    })

    return message
  }
}
