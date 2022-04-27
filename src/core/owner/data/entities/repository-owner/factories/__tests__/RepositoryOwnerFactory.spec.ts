import * as uuid from 'uuid';
import { DocumentFactory } from '@core/shared/domain/value_objects';
import { RepositoryOwnerFactory } from '..';

describe('#RepositoryOwnerFactory', () => {
  test('create a Repository Owner', () => {
    const repositoryOwner = RepositoryOwnerFactory.create({
      id: uuid.v4(),
      name: 'John',
      document: DocumentFactory.create({ number: '12345678901' })
    });

    expect(repositoryOwner).toBeTruthy();
    expect(repositoryOwner.id).toBeDefined();
    expect(repositoryOwner.name).toBe('John');
    expect(repositoryOwner.document.number).toBe('12345678901');
    expect(repositoryOwner.created_at).toBeDefined();
    expect(repositoryOwner.updated_at).toBeDefined();
    expect(repositoryOwner.deleted_at).toBeUndefined();
  });
});
