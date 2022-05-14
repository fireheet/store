import { Entity } from '../entity/Entity';

export abstract class ValueObject {
  entity!: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }
}
