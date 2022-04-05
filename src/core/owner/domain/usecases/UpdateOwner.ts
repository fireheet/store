import { InputUpdateOwnerDTO } from '../dtos/update-owner';

export interface UpdateOwner {
  update(inputDto: InputUpdateOwnerDTO): Promise<boolean>;
}
