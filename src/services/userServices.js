import model from '../models';

const { User } = model;
const users = {

  getByKey: key => User.findOne({
    where: key,
    logging: false
  }),
};
export default users;
