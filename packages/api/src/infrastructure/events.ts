import { EventEmitter } from "events";
import { Service } from "typedi";

@Service()
export class DomainEvents extends EventEmitter {
  constructor() {
    super();
  }
}

export interface IDomainEvent {
  id: string;
  readonly eventName: string;
}

export abstract class EventHandler<T extends IDomainEvent> {
  handle(event: T) {
    console.log(event.eventName);
  }
}

export interface IEventedEntity {
  readonly domainEvents: IDomainEvent[];
  addDomainEvent(event: IDomainEvent): void;
}
