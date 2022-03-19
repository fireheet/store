import { MealConstants } from '@constants/domain';
import { Store } from '@domain/store';
import { Image } from '@domain/shared';

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
    const nameMaxLength = MealConstants.NAME_MAX_LENGTH;
    const minimumPrice = MealConstants.MINIMUM_PRICE;

    if (!(this.name && this.price && this.assignedStore)) {
      throw new Error('Meal values must not be null!');
    }

    if (this.name.length > nameMaxLength) {
      throw new Error(`Name must be less than ${nameMaxLength} characters!`);
    }

    if (this.price < minimumPrice) {
      throw new Error(`Price must be greater than ${minimumPrice}!`);
    }
  }
}
