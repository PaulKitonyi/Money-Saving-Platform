const excelJS = require('exceljs');
const _ = require('lodash');
const { Saving, validate } = require('../models/saving');

exports.createSaving = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let saving = new Saving(
    _.pick(req.body, ['amount', 'description', 'account'])
  );

  await saving.save();

  res.send(saving);
};

exports.getSavings = async (req, res) => {
  res.send(res.paginatedResults);
};

exports.exportSavings = async (req, res) => {
  const dateNow = Date.now();

  let savings = await Saving.find();

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

  // res.send(savings);
};
