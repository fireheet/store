import { Image } from '@core/shared/domain/value_objects';

export interface ChangeStoreLogo {
  change: () => Promise<Image>;
}
