import { ImageConstants } from '@core/shared/config/constants';

export class Image {
  fileName!: string;

  fileSize!: number;

  imageUrl!: string;

  constructor(data: Partial<Image>) {
    Object.assign(this, data);

    this.validateImage();
  }

  validateImage(): void {
    const maxFilenameLength = ImageConstants.MAX_FILENAME_LENGTH;
    const maxFileSize = ImageConstants.MAX_FILE_SIZE_IN_MB;

    if (!(this.fileName && this.imageUrl && this.fileSize)) {
      throw new Error('Image values must not be null!');
    }

    if (this.fileName.length > maxFilenameLength) {
      throw new Error(`File name must be less than 255 characters!`);
    }

    if (this.fileSize > maxFileSize) {
      throw new Error(`File size must be less than ${maxFileSize} MB!`);
    }
  }
}
