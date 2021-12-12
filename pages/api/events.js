import { getEvents, addEvent, deleteEvent } from '../../util/database';

    // GET
export default async function handler(req, res) {

  if (req.method === 'GET') {
    const events = await getEvents();
    return res.status(200).json(events);

    // POST
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log(body)
    const response = await addEvent({
      sport: body.theSport,
      datetime: body.timeDate,
      teamone: body.teamOne,
      teamtwo: body.teamTwo

    });
return res.status(200).json(response);

    // DELETE
   } else if (req.method === 'DELETE') {
     const body = req.body;
     console.log('body', body)
     const id = body.itemId;
    console.log('bodyid', id)
    await deleteEvent(id);
    }


  if (Array.isArray()) {
    return res.status(405).json;
  }

  return res.status(200).json();
}
