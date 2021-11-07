import { CREATE_TASK, DELETE_TASK, GET_TASKS } from '../actions/task.actions';

const defaultState = {
  tasks: [],
};

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: [...state.tasks, ...action.payload] };
    case CREATE_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case DELETE_TASK:
      // eslint-disable-next-line no-underscore-dangle
      return { ...state, tasks: state.tasks.filter((task) => task._id !== action.payload) };
    default:
      return state;
  }
};

export default taskReducer;
export const addTasksAction = (payload) => ({ type: GET_TASKS, payload });
export const addTaskAction = (payload) => ({ type: CREATE_TASK, payload });
export const deleteTaskAction = (payload) => ({ type: DELETE_TASK, payload });
