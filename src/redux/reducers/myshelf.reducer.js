const myShelfReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MYSHELF':
            return action.payload;
        case 'UNSET_MYSHELF':
            return [];
        default:
            return state;
        }
    };

  // user will be on the redux state at:
  // state.user
export default myShelfReducer;