import { IDomainEvent } from "../../infrastructure/events"

export class UserCreatedEvent implements IDomainEvent {
  static eventName: string = "userCreatedEvent"

  readonly eventName: string

  constructor(public id: string, public readonly name: string) {
    this.eventName = UserCreatedEvent.eventName
  }
}
