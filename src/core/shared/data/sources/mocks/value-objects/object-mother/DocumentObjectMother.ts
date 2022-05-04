import { Document } from '@core/shared/domain/value-objects';
import { DocumentDataBuilder } from '../data-builder';

export class DocumentObjectMother {
  static validCPF(): Document {
    return DocumentDataBuilder.aDocument().validCPF().build();
  }

  static validCPNJ(): Document {
    return DocumentDataBuilder.aDocument().validCNPJ().build();
  }

  static withoutNumber(): Document {
    return DocumentDataBuilder.aDocument().withoutNumber().build();
  }

  static longNumber(): Document {
    return DocumentDataBuilder.aDocument().longNumber().build();
  }

  static shortNumber(): Document {
    return DocumentDataBuilder.aDocument().shortNumber().build();
  }

  static withoutType(): Document {
    return DocumentDataBuilder.aDocument().withoutType().build();
  }

  static invalidCharacters(): Document {
    return DocumentDataBuilder.aDocument().invalidCharacters().build();
  }

  static invalidType(): Document {
    return DocumentDataBuilder.aDocument().invalidType().build();
  }
}
