import { RepositoryAddressDTO } from '@data/dtos';

export interface AddressesReadRepository {
  storeAddress(address: RepositoryAddressDTO): Promise<void>;
  removeAddress(id: string): Promise<void>;
  findAddressByID(id: string): Promise<RepositoryAddressDTO | undefined>;
}
