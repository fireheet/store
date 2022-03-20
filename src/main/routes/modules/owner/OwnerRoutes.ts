import { OwnerRoutes } from '@main/modules/owner/routes/OwnerRoutes';
import { OwnerTypes } from '@core/owner/config/types';
import { AppContainer } from '@main/config/inversify.config';

const ownerRoutes = AppContainer.get<OwnerRoutes>(OwnerTypes.OwnerRoutes);

export const { createOwnerRoute } = ownerRoutes;
