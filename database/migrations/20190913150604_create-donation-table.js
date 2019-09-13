exports.up = async function up(knex) {
	await knex.schema.createTable('donations', table => {
		table
		.increments('id')
		.unsigned()
		.notNullable()
		.primary(['user_job_pkey']);
		table.string('volunteer_name', 50).notNullable();
		table.string('email', 255).notNullable();
		table.double('amount').notNullable();
		table.string('message', 255).notNullable();
		table.dateTime('date').notNullable();
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTable('donations');
};
