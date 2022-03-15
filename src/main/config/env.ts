import { EnvironmentConstants } from '@constants/application/EnvironmentConstants';

export const env = {
  port: process.env.PORT || EnvironmentConstants.PORT
};
