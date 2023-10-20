const initialState = {
  token: "",
  email1: "",
  firstName: "",

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      console.log('Token updated in reducer:', action.payload);
      return {
        ...state,
        token: action.payload
      };

    case 'UPDATE_EMAIL':
      return {
        ...state,
        email1: action.payload
      };

    case 'UPDATE_FIRSTNAME':
      return {
        ...state,
        firstName: action.payload
      };

    default:
      return state;
  }
};

export default authReducer;

