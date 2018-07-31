export default (state = null, { type, payload }) => {
  switch (type) {
    case 'PROFILE_SET':
      return payload;
    case 'TOKEN_REMOVE': // we log out here
      return null; // this removes the profile from the redux store
    default: 
      return state;
  }
};
