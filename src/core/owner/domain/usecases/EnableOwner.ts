import { InputEnableOwnerDTO } from '../dtos/enable-owner';

export interface EnableOwner {
  enable(enableOwnerDTO: InputEnableOwnerDTO): Promise<boolean>;
}
