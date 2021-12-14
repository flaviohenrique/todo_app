import { Entity } from "./entity";
import { IDomainEvent, IEventedEntity } from "./events";

export abstract class AggregateRoot<T>
  extends Entity<T>
  implements IEventedEntity
{
  public readonly domainEvents: IDomainEvent[] = [];

  addDomainEvent(event: IDomainEvent): void {
    this.domainEvents.push(event);
  }

  get id(): string {
    return this._id;
  }
}
