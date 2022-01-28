import { User } from '@domain/entities';
import { RepositoryFields } from '@data/models/repository';

export type RepositoryUserModel = RepositoryFields & User;
