import { HttpConstants } from '../../../../shared/config/constants/http';
import { RepositoryOwnerObjectMother } from '../../../data/sources';
import { OutputCreateOwnerDTO } from '../../../domain/dtos';
import { OwnerHttpPresenter } from '../OwnerHttpPresenter';

describe('#OwnerHttpPresenter', () => {
  test('createResponse should return an Owner Http Created Response', () => {
    const outputDTO: OutputCreateOwnerDTO = RepositoryOwnerObjectMother.valid();
    const response = OwnerHttpPresenter.createResponse(outputDTO);

    expect(response.data).toStrictEqual({
      id: outputDTO.id,
      name: outputDTO.name
    });

    expect(response.statusCode).toEqual(HttpConstants.CREATED);
  });

  test('updateResponse should return an Owner Http OK Response', () => {
    const outputDTO: OutputCreateOwnerDTO = RepositoryOwnerObjectMother.valid();
    const response = OwnerHttpPresenter.updateResponse(outputDTO);

    expect(response.data).toStrictEqual({
      id: outputDTO.id,
      name: outputDTO.name
    });

    expect(response.statusCode).toEqual(HttpConstants.OK);
  });

  test('showResponse should return an Owner Http OK Response', () => {
    const outputDTO: OutputCreateOwnerDTO = RepositoryOwnerObjectMother.valid();
    const response = OwnerHttpPresenter.showResponse(outputDTO);

    expect(response.data).toStrictEqual({
      id: outputDTO.id,
      name: outputDTO.name
    });

    expect(response.statusCode).toEqual(HttpConstants.OK);
  });

  test('enableResponse should return an Owner Http OK Response', () => {
    const { id }: OutputCreateOwnerDTO = RepositoryOwnerObjectMother.valid();
    const response = OwnerHttpPresenter.enableResponse(id);

    expect(response.data).toStrictEqual(`Owner ${id} enabled.`);

    expect(response.statusCode).toEqual(HttpConstants.OK);
  });

  test('disableResponse should return an Owner Http OK Response', () => {
    const { id }: OutputCreateOwnerDTO = RepositoryOwnerObjectMother.valid();
    const response = OwnerHttpPresenter.disableResponse(id);

    expect(response.data).toStrictEqual(`Owner ${id} disabled.`);

    expect(response.statusCode).toEqual(HttpConstants.OK);
  });
});
