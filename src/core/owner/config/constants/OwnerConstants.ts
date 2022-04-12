export const NAME_MAX_LENGTH: number = Number.parseInt(
  process.env.OWNER_NAME_MAX_LENGTH || '150',
  10
);
