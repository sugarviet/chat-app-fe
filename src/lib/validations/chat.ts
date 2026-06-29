import * as zod from 'zod';

const chatSchema = zod.object({
  msg: zod.string().min(1),
  conversationId: zod.string()
})

export { chatSchema };