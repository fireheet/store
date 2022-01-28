import { Role } from '@domain/entities';

export interface ListRole {
  list: () => Promise<Role>;
}
