export function RandomInRange(minimum: number, maximum: number) {
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}
