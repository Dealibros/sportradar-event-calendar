import { filterEvents} from '../../../util/database';


// GET
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await filterEvents(req.query.sports);
    return res.status(200).json(response);
  }
}
