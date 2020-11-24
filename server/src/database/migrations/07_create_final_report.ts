import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('final_reports', table => {
        table.increments('id').primary();
        table.integer('scope_specifications').notNullable();
        table.integer('process_efficiency').notNullable();
        table.integer('goal_achievement').notNullable();
        table.integer('project_management_quality').notNullable();
        table.integer('stakeholder_satisfaction').notNullable();
        table.integer('team_satisfaction ').notNullable();
        table.integer('customer_satisfaction').notNullable();
        table.integer('intention_to_use').notNullable();
        table.integer('on_budget').notNullable();
        table.integer('on_time').notNullable();
        table.integer('system_quality').notNullable();
        table.integer('information_quality').notNullable();
        table.integer('business_impact').notNullable();
        table.integer('impact_on_users').notNullable();
        table.integer('project_id').unsigned();
        table.foreign('project_id').references('risks_classification.id');
    });

}

export async function down(knex: Knex) {
    return knex.schema.dropTable('final_reports');
}
