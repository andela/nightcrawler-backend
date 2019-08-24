import jwt from 'jsonwebtoken';
import constant from '../config/constants';

const { SECRET_KEY } = constant;
const Auth = {
  async generateToken(data) {
    const token = await jwt.sign(
      { key: data }, SECRET_KEY
    );
    return token;
  },
};
export default Auth;
