import Knex from 'knex';
import risks from '../../dto/risks';

export async function up(knex: Knex) {
    return await knex.schema.createTable('risks', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('risk_classification_id').unsigned();
        table.foreign('risk_classification_id').references('risks_classification.id');
        }).then(function () {
            return knex("risks").insert(risks);
        });

}

export async function down(knex: Knex) {
    return knex.schema.dropTable('risks');
}
