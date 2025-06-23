import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('listings', function(table) {
            table.uuid('id').primary().index();
            table.string('title').notNullable();
            table.text('description');
            table.integer('price').notNullable();
            table.integer('type').notNullable().index();
            table.string('city').notNullable().index();
            table.integer('status').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
            table.uuid('creatorId').unsigned().notNullable()
                .references('id').inTable('users')
                .onDelete('CASCADE')
                .index()
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('listings')
}

