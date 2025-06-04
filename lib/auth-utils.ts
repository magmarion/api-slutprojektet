import { getSession } from './auth';

export async function verifyAdminAccess() {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Obehörig: Ingen användarsession hittades');
  }

  if (!session.user.isAdmin) {
    throw new Error('Förbjudet: Administratörsåtkomst krävs');
  }

  return session.user;
}
