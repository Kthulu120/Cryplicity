import { store } from './../../index';
import { addNotification as notify } from 'reapop';
/**
 *
 * @param title
 * @param {string} message The message for the Error Notification
 * @constructor constructs Error Notification
 */
export const ErrorNotificationFactory = (title, message) => {
  store.dispatch(notify({
    title,
    message: `${message}`,
    status: 'error',
    dismissible: true,
    dismissAfter: 4000,
    buttons: [{
      name: 'OK',
      primary: true
    }]
  }));
};

export const InfoNotificationFactory = (title, message) => {
  store.dispatch(notify({
    title,
    message: `${message}`,
    status: 'info',
    dismissible: true,
    dismissAfter: 4000,
    buttons: [{
      name: 'OK',
      primary: true
    }]
  }));
};

export const SuccessNotificationFactory = (title, message) => {
  store.dispatch(notify({
    title,
    message: `${message}`,
    status: 'success',
    dismissible: true,
    dismissAfter: 4000,
    buttons: [{
      name: 'OK',
      primary: true
    }]
  }));
};
