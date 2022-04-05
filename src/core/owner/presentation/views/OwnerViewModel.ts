export class OwnerViewModel {
  id!: string;

  name!: string;

  isEnabled!: boolean;

  constructor(dto: unknown) {
    Object.assign(this, dto);
  }
}
