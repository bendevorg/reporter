/**
 * Module to send a new error report
 * @module controllers/sendError
*/
const request = require('request');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');


/**
 * Receive a new error report and send to a telegram chat
 *
 * @param {integer} req.params.telegram_id - Telegram chat id
 * @param {integer} req.body.data - Error data message
 * @return {object} - Rerturns an object telling if the error report was successful sent
 * @throws {object} - Returns a msg that indicates a fail sending the error report
 * 
*/
module.exports = function(req, res){
  let {telegram_id} = req.params
  let {data} = req.body;

  if (!validator.isValidInteger(telegram_id))
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
  let name = (!data.item.last_occurrence || !validator.isValidString(data.item.last_occurrence.name))?
    constants.messages.error.UNDEFINED_NAME:data.item.last_occurrence.name.trim();
  let title = data.item.title.trim();
  let message = {
    message: generateErrorMessage(name, title)
  };
  request.post({url: process.env.TELEGRAM_URL + telegram_id, json: message}, (err, htmlInfo, body) => {
    if (err)
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED
      });
    return res.status(200).json({
      msg: constants.messages.info.REPORT_SENT
    });
  });
};

function generateErrorMessage(name, title){
  return `Error \n[${name}] - ${title}`;
}