import { RepositoryOwnerObjectMother } from '..';

describe('#RepositoryOwnerObjectMother', () => {
  test('create a valid RepositoryOwner', () => {
    const {
      id,
      name,
      document,
      notification,
      created_at,
      deleted_at,
      updated_at
    } = RepositoryOwnerObjectMother.valid();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
    expect(created_at).toBeDefined();
    expect(updated_at).toBeDefined();
    expect(deleted_at).toBeUndefined();
  });

  test('create a disabled RepositoryOwner', () => {
    const {
      id,
      name,
      document,
      notification,
      created_at,
      deleted_at,
      updated_at
    } = RepositoryOwnerObjectMother.disabled();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
    expect(created_at).toBeDefined();
    expect(deleted_at).toBeDefined();
    expect(updated_at).toBeDefined();
  });
});
