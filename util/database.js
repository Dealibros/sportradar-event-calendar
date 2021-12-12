import postgres from 'postgres';
import dotenvSafe from 'dotenv-safe';
import camelcaseKeys from 'camelcase-keys';

// Reads the environment variables in the .env file, making it possible to connect to PostgreSQL.

dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    sql = postgres({ ssl: {rejectUnauthorized: false} });
  } else {
    if(!globalThis.__postgresSqlClient) {
    globalThis.__postgresSqlClient = postgres();
  }
  sql = globalThis.__postgresSqlClient;
}

  return sql;
}

 const sql = connectOneTimeToDatabase();


export async function addEvent({datetime, sport, teamone, teamtwo}) {
  const events = await sql`
    INSERT INTO events
      (timedate, sport, teamone, teamtwo)
    VALUES
      (${datetime}, ${sport}, ${teamone}, ${teamtwo})

    RETURNING *;
  `;

  return events.map((u) => camelcaseKeys(u))[0];
};

export async function getEvents() {
  const events = await sql`
    SELECT id, timedate, teamone, teamtwo, sport FROM events
    ORDER BY timedate;
  `;

  return events.map((u) => camelcaseKeys(u));
}

export async function getSports() {
  const sports = await sql`
  SELECT * FROM sports
`;

  return sports.map((u) => camelcaseKeys(u));
}
export async function deleteEvent(id) {
  const deletedEvent = await sql`
    DELETE FROM events
    WHERE id = ${id};
  `;

  return deletedEvent.map((u) => camelcaseKeys(u));
}

export async function filterEvents(sport) {
  const filterEvents = await sql`
  SELECT * FROM events
  WHERE sport = ${sport}`;

  return filterEvents.map((u) => camelcaseKeys(u));
}
