import { DomainEvents } from "../infrastructure/events";

import { IEventedEntity, IDomainEvent } from "../shared/events";

export abstract class BaseRepository {
  protected domainEventsController!: DomainEvents;

  dispatchEvents(entity: IEventedEntity, eventName: string): void {
    entity.domainEvents
      .filter((e: IDomainEvent) => e.eventName == eventName)
      .forEach((e: IDomainEvent) => {
        this.domainEventsController.emit(e.eventName, e);
      });
  }
}
