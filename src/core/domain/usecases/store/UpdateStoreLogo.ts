import { Store } from '../../entities';

export interface UpdateStoreLogo {
  update: () => Promise<Store>;
}
