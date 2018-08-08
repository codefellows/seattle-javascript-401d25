// import decode from 'jwt-decode';
let decode = token => JSON.parse(atob(token.split('.')[1]));

let initialState = {};

let users = {
  user: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViM2RiN2VjMDczMDQ2YWExOTRmMWJmYiIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sImlhdCI6MTUzMDc3MzA0MX0.Hu0NtiAZeg_hYLapGHgH-JELPF0h83DvVqr45SOiul0',
  },
  editor: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViM2RiN2VjMDczMDQ2YWExOTRmMWJmYiIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwidXBkYXRlIl0sImlhdCI6MTUzMDc3MzUzMn0.NJ_lrFlrM8CT3mlA48s_Tay8zZ8Vjq001uB8qy5mGTc',
  },
  admin: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViM2RiN2VjMDczMDQ2YWExOTRmMWJmYiIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJyZWFkIiwidXBkYXRlIiwiZGVsZXRlIl0sImlhdCI6MTUzMDc3MzU2Mn0.BeReiP0N_h53aBwn5PXIEgNBZSL-p01oiArlmbGyaGU',
  },
  default: {
    token: 'x.eyJjYXBhYmlsaXRpZXMiOltdfQ==.x',
  },
};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'SWITCH_USER':
      // let token = users["user"] ? 
      let token = users[payload] ? users[payload].token : users.default.token;
      console.log('Token', token);
      let userData = decode(token);
      return userData;
    default:
      return state;
  }
};
