const data = require('../model/budgetModel');

exports.createBudget = (req, res) => {
  const budgetItem = req.body;
  if (budgetItem) {
    data.add(budgetItem);
    res.json(budgetItem);
  } else {
    res.status(500).send('No budget item provided');
  }
};

exports.getBudget = async (req, res) => {
  try {
    const result = await data.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateBudget = async (req, res) => {
  const id = Number(req.params.id);
  const budgetItem = req.body;

  if (!budgetItem) {
    res.status(400).send('Missing item data');
    return;
  }

  const updatedItem = await data.update(id, budgetItem);

  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
};

exports.deleteBudget = async (req, res) => {
  const id = Number(req.params.id);
  const result = await data.delete(id);

  if (result[0].affectedRows === 1) {
    res.status(200).send('Item deleted');
  } else {
    res.status(404).send('Item not found');
  }
};
