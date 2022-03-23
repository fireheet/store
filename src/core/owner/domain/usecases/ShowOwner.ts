import { Owner } from '@core/owner/domain/entities';

export interface ShowOwner {
  show(showOwnerDTO: unknown): Promise<Owner>;
}
