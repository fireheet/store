import { Store } from '@core/store/domain/entities/Store';
import { RecommendationConstants } from '@core/store/config';

export class Recommendation {
  id!: string;

  intendedStore!: Store;

  isPositive!: boolean;

  comment!: string;

  stars!: number;

  constructor(data: Partial<Recommendation>) {
    Object.assign(this, data);

    this.validateRecommendation();
  }

  validateRecommendation(): void {
    const minimumStars = RecommendationConstants.MINIMUM_STARS;
    const maximumStars = RecommendationConstants.MAXIMUM_STARS;
    const commentMaxLength = RecommendationConstants.COMMENT_MAX_LENGTH;

    if (
      !(this.intendedStore && this.comment && this.isPositive && this.stars)
    ) {
      throw new Error('Recommendation values must not be null!');
    }

    if (this.stars < minimumStars || this.stars > maximumStars) {
      throw new Error(
        `Stars must be between ${minimumStars} and ${maximumStars}!`
      );
    }

    if (this.comment.length > commentMaxLength) {
      throw new Error(
        `Comment must be less than ${commentMaxLength} characters!`
      );
    }
  }
}
