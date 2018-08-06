// change
// don't validate yet
// const validateProfile = (profile) => {
//   if (!profile) {
//     throw new Error('Profile is required');
//   }

//   const { username, email, bio } = profile;

//   const isIncomplete = !username || !email || !bio;
//   if (isIncomplete) {
//     throw new Error('Invalid Profile');
//   }
//   return undefined;
// };

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'PROFILE_SET':
      // validateProfile(payload);
      return payload;

    case 'TOKEN_REMOVE': // we log out here
      return null; // this removes the profile from the redux store
    default: 
      return state;
  }
};
