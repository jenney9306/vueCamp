import axios from 'axios';

// basic config for axios
const APP_URL = 'http://localhost:3000/';

function create(url, options) {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  return instance;
}

const auth = create(APP_URL);

// user related
function loginUser(data) {
  try {
    return auth.post('login', data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

function signupUser(data) {
  try {
    return auth.post('signup', data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export {
  loginUser,
  signupUser,
}