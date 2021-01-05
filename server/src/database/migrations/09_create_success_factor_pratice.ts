import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('success_factor_practice', table => {
        table.increments('id').primary();
        table.integer('practice_id').unsigned();
        table.integer('final_report_id').unsigned();
        table.string('success_factor').notNullable();
        
        table.foreign('practice_id').references('practices.id');
        table.foreign('final_report_id').references('final_reports.id');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('success_factor_practice');
}