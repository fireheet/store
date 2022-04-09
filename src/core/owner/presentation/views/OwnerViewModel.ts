import { OwnerModel } from '@core/owner/data';
import { UnallowedViewFields } from '../../config';

export type OwnerViewModel = Omit<OwnerModel, UnallowedViewFields>;
