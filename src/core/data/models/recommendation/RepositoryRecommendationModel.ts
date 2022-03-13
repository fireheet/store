import { Recommendation } from '@domain/entities';
import { RepositoryFields } from '../repository';

export type RepositoryRecommendationModel = Recommendation & RepositoryFields;
