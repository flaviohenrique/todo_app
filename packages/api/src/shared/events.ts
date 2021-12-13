export interface IDomainEvent {
  id: string;
  readonly eventName: string;
}

export interface IEventedEntity {
  readonly domainEvents: IDomainEvent[];
  addDomainEvent(event: IDomainEvent): void;
}
