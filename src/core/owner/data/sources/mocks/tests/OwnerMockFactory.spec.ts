import { OwnerMockFactory } from '@core/owner/data';

describe('OwnerMockFactory', () => {
  describe('RepositoryOwnerModel', () => {
    it('should return an Repository Owner Model if given no parameters', () => {
      const owner = OwnerMockFactory.makeRepositoryOwnerModel();

      expect(owner).toBeDefined();
      expect(owner.id).toBeDefined();
      expect(owner.name).toBeDefined();
      expect(owner.document).toBeDefined();
      expect(owner.isEnabled).toBe(true);
    });

    it('should return an Repository Owner Model with values from parameter', () => {
      const owner = OwnerMockFactory.makeRepositoryOwnerModel({
        id: '1',
        name: 'New'
      });

      expect(owner).toBeDefined();
      expect(owner.id).toBeDefined();
      expect(owner.id).toBe('1');
      expect(owner.name).toBeDefined();
      expect(owner.name).toBe('New');
      expect(owner.document).toBeDefined();
      expect(owner.isEnabled).toBe(true);
    });
  });

  describe('CreateOwnerDTO', () => {
    it('should return an Create Owner DTO if given no parameters', () => {
      const ownerDto = OwnerMockFactory.makeCreateOwnerDTO();

      expect(ownerDto).toBeDefined();
      expect(ownerDto.name).toBeDefined();
      expect(ownerDto.documentNumber).toBeDefined();
    });

    it('should return an Create Owner DTO with values from parameter', () => {
      const ownerDto = OwnerMockFactory.makeCreateOwnerDTO({
        name: 'New',
        documentNumber: '12345678901',
        documentType: 'cpf'
      });

      expect(ownerDto).toBeDefined();
      expect(ownerDto.name).toBeDefined();
      expect(ownerDto.name).toBe('New');
      expect(ownerDto.documentNumber).toBeDefined();
      expect(ownerDto.documentNumber).toBe('12345678901');
    });
  });

  describe('UpdateOwnerDTO', () => {
    it('should return an Update Owner DTO if given no parameters', () => {
      const ownerDto = OwnerMockFactory.makeUpdateOwnerDTO();

      expect(ownerDto).toBeDefined();
      expect(ownerDto.name).toBeDefined();
    });

    it('should return an Update Owner DTO with values from parameter', () => {
      const ownerDto = OwnerMockFactory.makeUpdateOwnerDTO({
        name: 'New'
      });

      expect(ownerDto).toBeDefined();
      expect(ownerDto.name).toBeDefined();
      expect(ownerDto.name).toBe('New');
    });
  });

  describe('Owner Model', () => {
    it('should return an Owner Model if given no parameters', () => {
      const owner = OwnerMockFactory.makeOwnerModel();

      expect(owner).toBeDefined();
      expect(owner.name).toBeDefined();
      expect(owner.document).toBeDefined();
      expect(owner.isEnabled).toBe(true);
    });

    it('should return an Owner Model with values from parameter', () => {
      const owner = OwnerMockFactory.makeOwnerModel({
        name: 'New'
      });

      expect(owner).toBeDefined();
      expect(owner.name).toBeDefined();
      expect(owner.name).toBe('New');
      expect(owner.document).toBeDefined();
      expect(owner.isEnabled).toBe(true);
    });
  });
});
