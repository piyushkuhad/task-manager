export const grpTodosByDate = (data) => {
  // this gives an object with dates as keys
  const groups = data.reduce((groups, todo) => {
    const date = todo.taskTime.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      todos: groups[date],
    };
  });

  console.log(groupArrays);

  return groupArrays;
};

export const getISOFormat = (date) => new Date(date).toISOString();

export const addTodoByDate = (data, item) => {
  console.log('Data', data, item);

  const dateOnly = item.taskTime.split('T')[0];

  if (Object.keys(data).length === 0 || !data[dateOnly]) {
    data[dateOnly] = [item];
  } else {
    data[dateOnly].push(item);
  }

  return data;
};
