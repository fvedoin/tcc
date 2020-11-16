import Knex from 'knex';
import risksClassification from '../../dto/risksClassification';

export async function up(knex: Knex) {
    return await knex.schema.createTable('risks_classification', table => {
        table.increments('id').primary();
        table.enum('name', [
            'mission and goals', 'program management', 'decision drivers', 'organization management', 'customer/user',
            'project parameters', 'product content', 'deployment', 'development process',
            'development environment', 'project management', 'project team', 'technology',
            'maintenance'
        ]).notNullable();
        table.integer('probability').notNullable();
        table.enum('impact', [
            'n', 'mi', 'mo', 's', 'c'
        ]).notNullable();
        table.enum('level', [
            'low', 'medium', 'high'
        ]).notNullable();
        }).then(function () {
            return knex("risks_classification").insert(risksClassification);
        });

}

export async function down(knex: Knex) {
    return knex.schema.dropTable('risks_classification');
}
