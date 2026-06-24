import * as zod from 'zod';

const chatSchema = zod.object({
  msg: zod.string()
})

export { chatSchema };