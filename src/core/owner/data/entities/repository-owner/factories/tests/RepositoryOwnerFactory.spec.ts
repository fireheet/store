import * as uuid from 'uuid';
import { RepositoryOwnerFactory } from '..';
import { DocumentFactory } from '../../../../../../shared/domain/value_objects';

describe('#RepositoryOwnerFactory', () => {
  it('should return a valid Repository Owner', () => {
    const repositoryOwner = RepositoryOwnerFactory.create({
      id: uuid.v4(),
      name: 'John',
      document: DocumentFactory.create({ number: '12345678901' })
    });

    expect(repositoryOwner).toBeTruthy();
    expect(repositoryOwner.id).toBeDefined();
    expect(repositoryOwner.name).toBe('John');
    expect(repositoryOwner.document.number).toBe('12345678901');
  });
});
