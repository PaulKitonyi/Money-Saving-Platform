const excelJS = require('exceljs');
const _ = require('lodash');
const Joi = require('joi');
const { Saving, validate } = require('../models/saving');

exports.createSaving = async (req, res) => {
  const accountId = req.params.accountId;

  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let savingResult = await Saving.find().and({
    account: accountId,
    createdAt: { $eq: Date() },
  });

  if (savingResult.length !== 0)
    return res
      .status(400)
      .send("You have already saved today.You can't save twice.");

  let saving = new Saving({
    amount: req.body.amount,
    description: req.body.description,
    account: accountId,
  });

  await saving.save();

  res.send(saving);
};

exports.getSavings = async (req, res) => {
  res.send(res.paginatedResults);
};

exports.exportSavings = async (req, res) => {
  const { startDate, endDate } = req.body;

  const { error } = validateDateRange(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const dateNow = Date.now();

  let savings = await Saving.find({
    createdAt: { $gte: startDate, $lt: endDate },
  });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Savings Report');
  const path = './files';
  const fileName = dateNow + '-' + 'savingsreport.xlsx';

  worksheet.columns = [
    { header: 'Account Number', key: 'account', width: 10 },
    { header: 'Saved Amount', key: 'amount', width: 10 },
    { header: 'Description', key: 'description', width: 10 },
    { header: 'Date', key: 'createdAt', width: 10 },
  ];

  let counter = 1;
  savings.forEach((saving) => {
    worksheet.addRow(saving);
    counter++;
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    const data = await workbook.xlsx
      .writeFile(`${path}/${fileName}`)
      .then(() => {
        res.send({
          status: 'success',
          message: 'file successfully downloaded',
          path: `${path}/${fileName}`,
        });
      });
  } catch (err) {
    res.send({
      status: 'error',
      message: err.message,
    });
  }
};

function validateDateRange(dateRange) {
  const schema = {
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
  };

  return Joi.validate(dateRange, schema);
}
