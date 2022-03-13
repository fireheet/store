import { StoreStatus } from './types/StoreStatus';

export class Availability {
  openHour!: number;

  closeHour!: number;

  waitingTime!: number;

  isOpen = false;

  status = StoreStatus.Closed;

  constructor(data: Partial<Availability>) {
    Object.assign(this, data);

    this.validateAvailability();
  }

  validateAvailability(): void {
    if (!(this.openHour && this.closeHour && this.waitingTime !== undefined)) {
      throw new Error('Availability values must not be null!');
    }

    if (this.openHour > this.closeHour) {
      throw new Error('Open hour must be before close hour!');
    }

    if (this.waitingTime < 0) {
      throw new Error('Waiting time must be greater than zero!');
    }
  }
}
