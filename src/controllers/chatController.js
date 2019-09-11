import { chatEmitter, getChatsEmitter } from '../helpers/notificationHandler';
import { getChats, postChat } from '../services/chatServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

export const createChat = async (req, res) => {
  const payload = { ...req.body, userId: req.auth.id };
  try {
    const chat = await postChat(payload);
    chatEmitter(chat.toJSON());
    return respondWithSuccess(res, statusCode.created, 'Chat created successfully', chat.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const chats = await getChats(req.query.sender, req.query.recipient);
    if (!chats.length) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'Chats not found');
    }
    const payload = { ...chats, sender: req.query.sender, recipient: req.query.recipient };
    getChatsEmitter(payload);
    return respondWithSuccess(res, statusCode.success, 'Chat was retrieved successfully', chats);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};
