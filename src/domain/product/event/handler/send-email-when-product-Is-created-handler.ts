import { EventHandlerInterface } from '../../../@shared/event/event-handler-interface'
import { EventInterface } from '../../../@shared/event/event-interface'
import { ProductCreatedEvent } from '../product-created-event'

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handler (event: EventInterface): void {
    console.log(`sending email to ${event.eventData.email as string}`)
  }
}
