import { Image } from '@domain/value_objects';

export interface ChangeStoreLogo {
  change: () => Promise<Image>;
}
