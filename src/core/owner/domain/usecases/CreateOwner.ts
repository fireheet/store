import { InputCreateOwnerDTO, OutputCreateOwnerDTO } from '../dtos';

export interface CreateOwner {
  create(inputDto: InputCreateOwnerDTO): Promise<OutputCreateOwnerDTO>;
}
