import { Knex } from "knex";
import { v7 as uuidv7 } from 'uuid';
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('listings').del();

     const existingUsers = await knex('users').select('id').limit(1);
    if (existingUsers.length === 0) {
        throw new Error('There is not a single user in the users table..');
    }

    const creatorId = existingUsers[0].id as string;

    await knex('listings').insert([
        {
            id: uuidv7(), 
            title: 'Уютная квартира',
            description: 'Хорошая и уютная квартира в центре города.',
            price: 1200,
            type: 1,
            city: 'Москва',
            status: 1,
            createdAt: knex.fn.now(),
            updatedAt: knex.fn.now(),
            creatorId
        },
        {
            id: uuidv7(), 
            title: 'Просторный дом',
            description: 'Большой дом с садом и гаражом.',
            price: 3500,
            type: 1,
            city: 'Тюмень',
            status: 1,
            createdAt: knex.fn.now(),
            updatedAt: knex.fn.now(),
            creatorId
        },
  ]);
}
