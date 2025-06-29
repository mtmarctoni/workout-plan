// seed-data/users.seed.ts
import { Prisma } from '@prisma/client';
export const users: Prisma.UserCreateInput[] = [ 
    {
        id: 'user1',
        email: 'marc_toni_mas@hotmail.com',
        name: 'Marc Toni Mas',
        avatar: 'https://marctonimas.com/profile-picture.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
 ];
