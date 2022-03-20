import { Owner } from '@core/owner/domain/entities';

export interface ShowOwner {
  show: () => Promise<Owner>;
}
