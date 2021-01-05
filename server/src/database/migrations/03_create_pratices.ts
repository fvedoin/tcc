import Knex from 'knex';
import practices from '../../dto/practices';

export async function up(knex: Knex) {
    return await knex.schema.createTable('practices', table => {
        table.increments('id').primary();
        table.enum('type', [
            'architecture modeling', 'traditional analysis', 'process/governance', 'database practices', 'communication (team) - whiteboard practices',
            'agile quality assurance', 'communication (team)', 'code analysis and inspection', 'lightweight testing and review',
            'architecture and configuration', 'traditional quality assurance', 'coding standards', 'lightweight requirements',
            'incremental and iterative development', 'communication (customers)'
        ]).notNullable();
        table.string('name').notNullable();
        }).then(function () {
            return knex("practices").insert(practices);
        });

}

export async function down(knex: Knex) {
    return knex.schema.dropTable('practices');
}
