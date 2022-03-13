import { Meal } from '@domain/entities';
import { RepositoryFields } from '../repository';

export type RepositoryMealModel = Meal & RepositoryFields;
