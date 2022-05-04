export const NAME_MAX_LENGTH: number = Number.parseInt(
  process.env.OWNER_NAME_MAX_LENGTH || '150',
  10
);

export const NAME_REGEX =
  /^([a-zA-Z\s\W]+[^0-9!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])$/;
