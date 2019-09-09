import Model from '../models';

const { Comment, TripRequest } = Model;

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
      where: { id: commentId },
      logging: false
    });

    return comment;
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
