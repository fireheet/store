import { Image } from '@core/shared/domain/value-objects';
import { Entity } from '@core/shared/domain/entity';
import { UUID } from '@core/shared/domain/value-objects/uuid/UUID';
import { ProductName } from '../value-objects/product-name/ProductName';
import { Price } from '../value-objects/price';

export class Product extends Entity {
  ownerId!: UUID;

  name!: ProductName;

  price!: Price;

  image?: Image;

  constructor(data: Partial<Product>) {
    super();

    Object.assign(this, data);

    this.validateProduct();
  }

  validateProduct(): void {
    console.log('not implemented');
  }
}
