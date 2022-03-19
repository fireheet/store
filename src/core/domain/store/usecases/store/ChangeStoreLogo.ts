import { Image } from '@domain/shared/value_objects';

export interface ChangeStoreLogo {
  change: () => Promise<Image>;
}
