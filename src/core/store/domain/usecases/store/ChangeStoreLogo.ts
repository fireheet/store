import { Image } from '@core/shared/domain';

export interface ChangeStoreLogo {
  change: () => Promise<Image>;
}
