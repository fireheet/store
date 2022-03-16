import crypto from 'crypto';

export function RandomInRange(minimum: number, maximum: number): number {
  const randomNumber = crypto.randomInt(maximum);

  const normalizedNumber = Math.abs(
    (randomNumber - minimum) / (maximum - minimum)
  );

  return Math.floor(normalizedNumber * (maximum - minimum) + minimum);
}
