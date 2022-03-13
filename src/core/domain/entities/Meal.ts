import { Image } from '@domain/value_objects/Image';
import { Store } from '@domain/entities/Store';

export class Meal {
  name!: string;

  price!: number;

  image?: Image;

  isOnShowcase = false;

  assignedStore!: Store;

  constructor(data: Partial<Meal>) {
    Object.assign(this, data);

    this.validateMeal();
  }

  validateMeal(): void {
    if (!(this.name && this.price && this.assignedStore)) {
      throw new Error('Meal values must not be null!');
    }

    if (this.name.length > 100) {
      throw new Error('Meal name must be less than 100 characters!');
    }

    if (this.price < 0) {
      throw new Error('Meal price must be greater than 0!');
    }
  }
}
