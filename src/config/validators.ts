import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function isValidUserId(id: number): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return !!user; // Si user tiene un valor, el ID es válido
  } catch (error) {
    console.error('Error validating user ID:', error);
    return false; // Si hay un error, consideramos que el ID no es válido
  }
}

export class Validators {

  
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  } 


}

