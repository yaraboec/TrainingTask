import backConString from '../enviroment';
import { addTaskAction, addTasksAction, deleteTaskAction } from '../reducers/task.reducer';

const fetchTasks = () => async function (dispatch) {
  await fetch(backConString.concat('/api/tasks'))
    .then((response) => response.json())
    .then((json) => dispatch(addTasksAction(json)));
};

export const addTask = (task) => async function (dispatch) {
  await fetch(backConString.concat('/api/tasks'), {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((responce) => responce.json())
    .then((json) => dispatch(addTaskAction(json)));
};

export const deleteTask = (id) => async function (dispatch) {
  await fetch(backConString.concat('/api/tasks/').concat(id), {
    method: 'DELETE',
  }).then((responce) => responce.json())
    .then((json) => dispatch(deleteTaskAction(json)));
};

export default fetchTasks;
