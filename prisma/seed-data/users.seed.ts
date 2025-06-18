// seed-data/users.seed.ts
import { Prisma } from '@prisma/client';
export const users: Prisma.UserCreateInput[] = [ 
    {
        id: 'user1',
        email: 'marc_toni_mas@hotmail.com',
        name: 'Marc Toni Mas',
        avatar: 'https://i.pravatar.cc/150?img=1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
 ];
