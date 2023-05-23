const db = require('../config/database');

exports.add = async (item) => {
  // Validate input
  if (!item.category || !item.description || !item.amount || !item.date) {
    throw new Error(
      'One or more required fields are missing. Required fields: category, description, amount, date',
    );
  }
  if (typeof item.amount !== 'number') {
    throw new Error('Amount must be a number');
  }
  if (typeof item.date !== 'string') {
    throw new Error('Date must be a string');
  }
  const [rows] = await db.execute(
    'INSERT INTO budget (category, description, amount, date) VALUES (?, ?, ?, ?)',
    [item.category, item.description, item.amount, item.date],
  );
  return rows;
};

exports.getAll = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM budget');
    return rows;
  } catch (err) {
    return [];
  }
};

exports.update = async (id, item) => {
  const [rows] = await db.execute(
    'UPDATE budget SET category = ?, description = ?, amount = ?, date = ? WHERE id = ?',
    [item.category, item.description, item.amount, item.date, id],
  );

  if (rows.affectedRows !== 1) {
    throw new Error(`Could not update record with id ${id}`);
  }

  return rows;
};

exports.delete = async (id) => {
  const result = await db.execute('DELETE FROM budget WHERE id = ?', [id]);
  if (result[0].affectedRows !== 1) {
    throw new Error(`Unable to delete budget with id ${id}`);
  }

  return result;
};
