import crypto from 'crypto';

export function RandomInRange(minimum: number, maximum: number): number {
  const randomNumber = crypto.randomInt(maximum);

  return Math.floor(randomNumber * (maximum - minimum) + minimum);
}
