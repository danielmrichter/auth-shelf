const galleryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GALLERY':
            return action.payload;
        case 'UNSET_GALLERY':
            return [];
        default:
            return state;
        }
    };

  // user will be on the redux state at:
  // state.user
export default galleryReducer;