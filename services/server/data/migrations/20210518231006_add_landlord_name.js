exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.string('landlordName');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('landlordName');
    });
  };
  