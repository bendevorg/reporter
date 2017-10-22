/**
 * Module to send a new report
 * @module controllers/sendReport
 */
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');


/**
 * Receive a new report and send to a telegram chat
 *
 * @param {integer} req.params.telegram_id - Telegram chat id
 * @param {integer} req.body.data - Report data message
 * @return {object} - Rerturns an object telling if the report was successful sent
 * @throws {object} - Returns a msg that indicates a fail sending the report
 * 
*/
module.exports = function(req, res){
  let {chatId} = req.params
  let {data} = req.body;
  console.log(data);
  if (!validator.isValidInteger(chatId))
    return res.status(400).json({
      msg: constants.messages.error.INVALID_TELEGRAM_ID
    });
  if (!data || !data.item)
    return res.status(400).json({
      msg: constants.messages.error.INVALID_DATA
    });
  if (!validator.isValidString(data.item.title))
    return res.status(400).json({
      msg: constants.messages.error.INVALID_ERROR_MESSAGE
    });
  return res.status(200).json({
    msg: constants.messages.info.REPORT_SENT
  });
  
};