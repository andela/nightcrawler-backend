import Model from '../models';

const { Comment, User } = Model;

/**
 * @exports createComment
 * @exports findCommentById
 * @exports deleteCommentById
 */

/**
 * Function to create comment
 * @exports
 * @param {Object} payload
 * @returns {Object} comment object
 */
export const createComment = async (payload) => {
  try {
    const comment = await Comment.create(payload);
    return comment;
  } catch (error) {
    return {
      errors: error
    };
  }
};

/**
 * Function to find comment by its id
 * @exports
 * @param {Number} commentId
 * @returns {Object} comment object
 */
export const findCommentById = async (commentId) => {
  try {
    const comment = await Comment.findOne({
      attributes: ['id', 'tripId', 'userId', 'comment', 'isVisible'],
      where: {
        id: commentId
      },
      logging: false
    });

    return comment.toJSON();
  } catch (error) {
    return {
      errors: error
    };
  }
};

/**
 * Function to delete comment
 * @exports
 * @param {Number} id
 * @override
 */
export const deleteCommentById = async (id) => {
  try {
    return await Comment.update({ isVisible: false }, { where: { id } });
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const getAllComments = async (id) => {
  try {
    return await Comment.findAll({
      attributes: ['id', 'tripId', 'userId', 'comment', 'isVisible', 'createdAt', 'updatedAt'],
      where: {
        [Model.Sequelize.Op.and]: [{
          tripId: id,
          isVisible: true
        }]
      },
    });
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const fetchTripComments = async (trip) => trip.getComments({
  attributes: ['id', 'tripId', 'comment', 'userId', 'createdAt', 'updatedAt'],
  where: {
    isVisible: true
  },
  include: [
    { model: User, as: 'users', attributes: ['id', 'username', 'firstName', 'lastName'] }
  ]
});
