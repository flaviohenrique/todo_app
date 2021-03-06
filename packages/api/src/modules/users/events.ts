import { IDomainEvent } from "../../shared/events";

export class UserCreatedEvent implements IDomainEvent {
  static eventName = "userCreatedEvent";

  readonly eventName: string;

  constructor(public id: string, public readonly name: string) {
    this.eventName = UserCreatedEvent.eventName;
  }
}
