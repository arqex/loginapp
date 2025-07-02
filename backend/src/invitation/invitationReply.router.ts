import { Router } from 'express';
import { handleInvitationReplyPublic } from './controllers/invitationReplyPublic.controller';

const invitationReplyRouter = Router();

// POST /invitation_reply
invitationReplyRouter.post('/invitation_reply', handleInvitationReplyPublic);

export default invitationReplyRouter;
