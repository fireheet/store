import { InputUpdateOwnerDTO } from '../dtos/update-owner';
import { OutputUpdateOwnerDTO } from '../dtos/update-owner/OutputUpdateOwnerDTO';

export interface UpdateOwner {
  update(inputDto: InputUpdateOwnerDTO): Promise<OutputUpdateOwnerDTO>;
}
