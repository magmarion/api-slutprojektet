// Validering med zod + server actions

import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Ogiltig e-postadress' }),
    password: z.string().min(6, { message: 'Lösenordet måste vara minst 6 tecken långt' }),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: 'Ogiltig e-postadress' }),
    password: z.string().min(6, { message: 'Lösenordet måste vara minst 6 tecken långt' }),
    username: z.string().min(3, { message: 'Användarnamnet måste vara minst 3 tecken långt' }),

});