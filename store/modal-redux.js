import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  openedItem: null,
  checkedItems: [],
  toggleNavigation: true,
  expiredTasks: [],
  notificationTask: null
};

const modalSlice = createSlice({
  name: "modalName",
  initialState,
  reducers: {
    populateTasks(state, action) {
      state.tasks = [...action.payload];
    },
    openDirectTask(state, action) {
      state.openedItem = action.payload;
    },
    closeDirectTask(state, action) {
      state.openedItem = null;
    },
    toggleCheckedItem(state, action) {
      const index = state.checkedItems.indexOf(action.payload);
      if (index != -1) {
        //remove
        state.checkedItems.splice(index, 1);
      } else {
        // add
        state.checkedItems.push(action.payload);
      }
    },
    replaceTasks(state, action) {
      state.tasks = [...action.payload.data];
      state.checkedItems = [];

      const currentDate = new Date().toJSON().slice(0, 10);
      // filtering data
      const expiredData = state.tasks.filter((item) => item.date < currentDate);

      state.expiredTasks = [...expiredData];
    },
    notificationTaskHandler(state, action){
      state.notificationTask = {value: action.payload.value, message: action.payload.message}
    },
    notificationTaskHandlerClear(state, action){
      state.notificationTask = null;
    }
  },
});

const store = configureStore({
  reducer: { toggleModal: modalSlice.reducer },
});

export const toggleActions = modalSlice.actions;
export default store;

export const getDataDB = () => {
  return async (dispatch) => {
    const getRequest = async () => {
      const response = await fetch("api/task/");

      if (!response.ok) {
        throw new Error({ message: "Get request is wrong" });
      }

      const data = await response.json();

      return data;
    };
    try {
      const dbData = await getRequest();

      const transformedData = JSON.parse(
        JSON.stringify(
          dbData.data.map((item) => ({
            id: item._id.toString(),
            title: item.title,
            description: item.description,
            date: item.date,
            author: item.author,
          }))
        )
      );

      dispatch(toggleActions.replaceTasks({ data: transformedData }));
    } catch (error) {}
  };
};
