export class Image {
  fileName!: string;

  imageUrl!: string;

  constructor(data: Partial<Image>) {
    Object.assign(this, data);

    this.validateImage();
  }

  validateImage(): void {
    if (!(this.fileName && this.imageUrl)) {
      throw new Error('Image values must not be null!');
    }

    if (this.fileName.length > 255 || this.fileName.length < 1) {
      throw new Error('File name must be between 1 and 255 characters!');
    }
  }
}
