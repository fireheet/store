import { Product } from '@core/product/domain/entities';

export interface CreateProduct {
  create: () => Promise<Product>;
}
