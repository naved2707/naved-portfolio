import { z } from 'zod';

const singleLine = value => !/[\r\n\u0000-\u001f\u007f]/.test(value);
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter a name of at least 2 characters.').max(80, 'Name must be 80 characters or fewer.').refine(singleLine, 'Name must be a single line.'),
  email: z.string().trim().max(254).email('Enter a valid email address.').refine(singleLine, 'Invalid email address.'),
  subject: z.string().trim().min(3, 'Enter a subject of at least 3 characters.').max(120, 'Subject must be 120 characters or fewer.').refine(singleLine, 'Subject must be a single line.'),
  message: z.string().trim().min(20, 'Message must contain at least 20 characters.').max(5000, 'Message must be 5,000 characters or fewer.').refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value), 'Message contains unsupported control characters.'),
  website: z.string().max(200).optional().default(''),
}).strict();

export function validationErrors(error) {
  return Object.fromEntries(Object.entries(error.flatten().fieldErrors).map(([key, values]) => [key, values[0]]));
}
