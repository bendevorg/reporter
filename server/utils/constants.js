/**
 * All project constants
 * @module utils/constants
*/
module.exports = {
  messages: {
    error: {
      INVALID_TELEGRAM_ID: 'The telegram id sent is invalid.',
      INVALID_DATA: 'No data message was sent.',
      INVALID_ERROR_MESSAGE: 'The error message sent is invalid.'
    },
    info: {
      REPORT_SENT: 'The report was successful sent.'
    }
  },
  regex:{
    integer: /^-?\d+$/
  }
};
