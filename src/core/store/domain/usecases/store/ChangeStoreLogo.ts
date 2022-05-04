import { Image } from '@core/shared/domain/value-objects';

export interface ChangeStoreLogo {
  change: () => Promise<Image>;
}
