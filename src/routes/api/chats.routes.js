import { Router } from 'express';
import { createChat, getChatMessages } from '../../controllers/chatController';
import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { validateChatFormData, validateChatQuery } from '../../middlewares/chatValidation';

const router = Router();

router.post('/chat', authenticateUserToken, validateChatFormData, checkPermission('CREATE_CHAT_MESSAGE'), createChat);

router.get('/chats', authenticateUserToken, validateChatQuery, checkPermission('VIEW_CHAT_MESSAGE'), getChatMessages);

export default router;
