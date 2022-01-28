import { Role } from '@domain/entities';

export interface ListAllRoles {
  list: () => Promise<Role>;
}
