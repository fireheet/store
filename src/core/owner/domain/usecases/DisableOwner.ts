import { InputDisableOwnerDTO } from '../dtos/disable-owner';

export interface DisableOwner {
  disable(disableOwnerDTO: InputDisableOwnerDTO): Promise<boolean>;
}
