import model from '../model';

const { User } = model;
const users = {

  getByKey: key => User.findOne({
    where: key
  }),
};
export default users;
