import { InputShowOwnerDTO, OutputShowOwnerDTO } from '../dtos';

export interface ShowOwner {
  show(inputDto: InputShowOwnerDTO): Promise<OutputShowOwnerDTO>;
}
