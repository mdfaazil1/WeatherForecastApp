export const ADD_VALUE = 'ADD_VALUE';
export const DELETE_VALUE = 'DELETE_VALUE';
export const DELETE_ALL='DELETE_ALL';

export const addValue = (value) => ({
  type: ADD_VALUE,
  payload: value,
});

export const deleteValue = (value) => ({
  type: DELETE_VALUE,
  payload: value,
});

export const deleteAll=()=>({
    type: DELETE_ALL,
})
