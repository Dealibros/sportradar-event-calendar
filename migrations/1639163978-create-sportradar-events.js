exports.up = async function up(sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      timeDate TIMESTAMPTZ,
      sport varchar(40) NOT NULL,
      teams varchar(100)
    )
  `;
};
// Drop table with ley down
exports.down = async function down(sql) {
  await sql`
    DROP TABLE events
  `;
};
