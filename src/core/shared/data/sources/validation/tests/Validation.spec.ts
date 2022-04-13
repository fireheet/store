import { Validation } from '../Validation';

describe('Validation', () => {
  it('should add a new validation error', () => {
    const validation = new Validation();

    validation.addError({
      context: 'test',
      message: 'test error'
    });

    expect(validation.messages('test')).toContain('test error');
  });

  it('should show all errors from one context', () => {
    const validation = new Validation();

    validation.addError({
      context: 'test',
      message: 'test error'
    });

    validation.addError({
      context: 'test',
      message: 'test error2'
    });

    expect(validation.messages('test')).toBe('test error, test error2');
  });

  it('should not show errors from different contexts', () => {
    const validation = new Validation();

    validation.addError({
      context: 'test',
      message: 'test error'
    });

    expect(validation.messages('test')).toContain('test error');

    validation.addError({
      context: 'test2',
      message: 'test error2'
    });

    expect(validation.messages('test')).not.toContain('test error2');
  });

  it('should show all errors from different contexts', () => {
    const validation = new Validation();

    validation.addError({
      context: 'test',
      message: 'test error'
    });

    validation.addError({
      context: 'test2',
      message: 'test error2'
    });

    expect(validation.messages()).toContain(
      'test:test error, test2:test error2'
    );
  });
});
