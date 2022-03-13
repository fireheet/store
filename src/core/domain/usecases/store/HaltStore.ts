export interface HaltStore {
  halt: () => Promise<boolean>;
}
