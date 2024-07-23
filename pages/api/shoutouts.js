import dbConnect from '/utils/dbConnect';
import Shoutout from '/models/Shoutout';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const shoutouts = await Shoutout.find().sort({ createdAt: -1 });
    res.status(200).json(shoutouts);
  } else if (req.method === 'POST') {
    const shoutout = await Shoutout.create(req.body);
    res.status(201).json(shoutout);
  } else {
    res.status(405).end();
  }
}