import Knex from 'knex';
import pratices from '../../dto/pratices';

export async function up(knex: Knex) {
    return await knex.schema.createTable('pratices', table => {
        table.increments('id').primary();
        table.enum('type', [
            'architecture modeling', 'traditional analysis', 'process/governance', 'database practices', 'communication (team) - whiteboard practices',
            'agile quality assurance', 'communication (team)', 'code analysis and inspection', 'lightweight testing and review',
            'architecture and configuration', 'traditional quality assurance', 'coding standards', 'lightweight requirements',
            'incremental and iterative development', 'communication (customers)'
        ]).notNullable();
        table.string('name').notNullable();
        }).then(function () {
            return knex("pratices").insert(pratices);
        });

}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pratices');
}
