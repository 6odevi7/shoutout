import dbConnect from '/utils/dbConnect';
import Shoutout from '/models/Shoutout';
import { Server } from 'socket.io';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newShoutout = await Shoutout.create(req.body);
    
    const io = new Server(res.socket.server);
    io.emit('shoutout_added', newShoutout);

    res.status(201).json(newShoutout);
  }
  
  await dbConnect();

  if (req.method === 'GET') {
    const shoutouts = await Shoutout.find().sort({ createdAt: -1 });
    res.status(200).json(shoutouts);
  } else if (req.method === 'POST') {
    const newShoutout = await Shoutout.create(req.body);
    
    const io = new Server(res.socket.server);
    io.emit('shoutout_added', newShoutout);

    res.status(201).json(newShoutout);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}