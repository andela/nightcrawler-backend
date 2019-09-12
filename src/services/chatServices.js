import Model from '../models';

const { Chat } = Model;

export const postChat = async (payload) => {
  try {
    const chat = await Chat.create(payload);
    return chat;
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const getChats = async (senderEmail, recipientEmail) => {
  try {
    const chats = await Chat.findAll({
      where: {
        [Model.Sequelize.Op.and]: [
          {
            [Model.Sequelize.Op.or]: [{
              sender: senderEmail
            },
            {
              sender: recipientEmail
            }]
          },
          {
            [Model.Sequelize.Op.or]: [{
              recipient: senderEmail
            },
            {
              recipient: recipientEmail
            }]
          }
        ]
      }
    });

    return chats;
  } catch (error) {
    return {
      errors: error
    };
  }
};
