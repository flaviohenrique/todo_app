import { EventEmitter } from "events";
import { Service } from "typedi";
import { IDomainEvent } from "../shared/events";

@Service()
export class DomainEvents extends EventEmitter {
  constructor() {
    super();
  }
}

export abstract class EventHandler<T extends IDomainEvent> {
  handle(event: T): void {
    console.log(event.eventName);
  }
}
