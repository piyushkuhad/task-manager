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

export const mergeTodosByMonthData = (currentObj, newObj, selectedDateObj) => {
  const { selectedDay, selectedMonth, selectedYear } = selectedDateObj;

  //Check if month-year entry exists if not then create
  if (currentObj[`${selectedMonth}-${selectedYear}`]) {
    console.log('1');
    let datePath = currentObj[`${selectedMonth}-${selectedYear}`][selectedDay];

    console.log('Date Path:', datePath);

    //check if date entry exists if true, then merge the data, else create the date entry
    if (datePath) {
      console.log('2');
      datePath = {
        ...datePath,
        ...newObj,
      };
      console.log('Date Path After:', datePath);
      currentObj[`${selectedMonth}-${selectedYear}`][selectedDay] = {
        ...datePath,
      };
    } else {
      console.log('3');
      datePath = newObj;
      currentObj[`${selectedMonth}-${selectedYear}`][selectedDay] = {
        ...datePath,
      };
    }
  }

  return currentObj;
};
