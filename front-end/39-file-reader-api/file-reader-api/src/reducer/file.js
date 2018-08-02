export default (state = [], { type, payload }) => {
  switch (type) {
    case 'SOUND_CREATE':
      return [payload, ...state];   
    case 'TOKEN_REMOVE': // this implies we logged out so we must clean up all items in the redux store
      return [];
    default: 
      return state;
  }
};
