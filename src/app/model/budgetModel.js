let data = [];

exports.add = (item) => {
  data.push(item);
  return data;
};

exports.getAll = () => {
  return data;
};

exports.update = (id, item) => {
  const index = data.findIndex(i => i.id === id);

  if (index !== -1) {
    data[index] = item;
    return item;
  } else {
    return null;
  }
};

exports.delete = (id) => {
  const index = data.findIndex(i => i.id === id);

  if (index !== -1) {
    data.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
