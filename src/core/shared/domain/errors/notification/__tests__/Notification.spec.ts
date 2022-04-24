import { Notification } from '../Notification';

describe('Notification', () => {
  it('should add a new notification error', () => {
    const notification = new Notification();

    notification.addError({
      context: 'test',
      message: 'test error'
    });

    expect(notification.messages('test')).toContain('test error');
  });

  it('should show all errors from one context', () => {
    const notification = new Notification();

    notification.addError({
      context: 'test',
      message: 'test error'
    });

    notification.addError({
      context: 'test',
      message: 'test error2'
    });

    expect(notification.messages('test')).toBe('test error, test error2');
  });

  it('should not show errors from different contexts', () => {
    const notification = new Notification();

    notification.addError({
      context: 'test',
      message: 'test error'
    });

    expect(notification.messages('test')).toContain('test error');

    notification.addError({
      context: 'test2',
      message: 'test error2'
    });

    expect(notification.messages('test')).not.toContain('test error2');
  });

  it('should show all errors from different contexts', () => {
    const notification = new Notification();

    notification.addError({
      context: 'test',
      message: 'test error'
    });

    notification.addError({
      context: 'test2',
      message: 'test error2'
    });

    expect(notification.messages()).toContain(
      'test:test error, test2:test error2'
    );
  });

  test.todo('create tests for hasErrors');
});
