import { getSports } from '../../util/database';

// GET
export default async function secondHandler(req, res) {
  if (req.method === 'GET') {
    const response = await getSports();
    return res.status(200).json(response);
  }
}