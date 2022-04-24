import { Owner } from '@core/owner/domain/entities';
import { OwnerDataBuilder } from '../data-builder';

export class OwnerObjectMother {
  static valid(): Owner {
    return OwnerDataBuilder.aOwner().valid().build();
  }

  static withoutName(): Owner {
    return OwnerDataBuilder.aOwner().withoutName().build();
  }

  static withoutDocument(): Owner {
    return OwnerDataBuilder.aOwner().withoutDocument().build();
  }

  static invalidName(): Owner {
    return OwnerDataBuilder.aOwner().invalidName().build();
  }

  static withoutID(): Owner {
    return OwnerDataBuilder.aOwner().withoutID().build();
  }

  static invalidID(): Owner {
    return OwnerDataBuilder.aOwner().invalidID().build();
  }

  static longName(): Owner {
    return OwnerDataBuilder.aOwner().longName().build();
  }

  static invalidDocumentNumber(): Owner {
    return OwnerDataBuilder.aOwner().invalidDocumentNumber().build();
  }

  static longDocumentNumber(): Owner {
    return OwnerDataBuilder.aOwner().longDocumentNumber().build();
  }

  static invalidDocumentType(): Owner {
    return OwnerDataBuilder.aOwner().invalidDocumentType().build();
  }
}
