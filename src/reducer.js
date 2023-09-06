import { ADD_VALUE, DELETE_ALL, DELETE_VALUE } from "./action";

const initialState = {
  values: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VALUE:
      return {
        ...state,
        values: [...state.values, action.payload],
      };
    case DELETE_VALUE:
      return {
        ...state,
        values: state.values.filter((value) => value !== action.payload),
      };
      case DELETE_ALL:
        return initialState;
    default:
      return state;
  }
};

export default reducer;
