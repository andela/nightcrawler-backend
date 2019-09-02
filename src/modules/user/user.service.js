/* eslint-disable arrow-body-style */
import db from '../../models';

export const createProfile = (profile) => db.Profile.create(profile);


export const updateProfile = (userId, profile) => {
  return db.Profile.update(profile, { where: userId, returning: true });
};

export const getAProfile = (condition = {}) => {
  const user = Object.keys(condition).length
    ? db.Profile.findOne({
      where: condition,
      logging: false
    })
    : null;

  return user;
};
