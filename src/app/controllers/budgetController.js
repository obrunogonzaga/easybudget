const data = require('../model/budgetModel');

exports.createBudget = (req, res) => {
  const budgetItem = req.body;
  data.add(budgetItem);
  res.json(budgetItem);
};

exports.getBudget = (req, res) => {
  res.json(data.getAll());
};

exports.updateBudget = (req, res) => {
  const id = Number(req.params.id);
  const budgetItem = req.body;

  const updatedItem = data.update(id, budgetItem);

  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
};

exports.deleteBudget = (req, res) => {
  const id = Number(req.params.id);

  const deleted = data.delete(id);

  if (deleted) {
    res.status(200).send('Item deleted');
  } else {
    res.status(404).send('Item not found');
  }
};
