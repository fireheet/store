import { Store } from '@domain/entities/Store';

export class Recommendation {
  intendedStore!: Store;

  isPositive!: boolean;

  comment!: string;

  stars!: number;

  constructor(data: Partial<Recommendation>) {
    Object.assign(this, data);

    this.validateRecommendation();
  }

  validateRecommendation(): void {
    if (
      !(this.intendedStore && this.comment && this.isPositive && this.stars)
    ) {
      throw new Error('Recommendation values must not be null!');
    }

    if (this.stars < 0 || this.stars > 5) {
      throw new Error('Recommendation stars must be between 0 and 5!');
    }

    if (this.comment.length > 300) {
      throw new Error(
        'Recommendation comment must be less than 500 characters!',
      );
    }
  }
}
