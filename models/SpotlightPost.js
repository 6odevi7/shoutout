import dbConnect from '../../lib/mongodb';
import SpotlightPost from '../../models/SpotlightPost'; // You'll need to create this model

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const spotlightPost = new SpotlightPost(req.body);
      await spotlightPost.save();
      res.status(201).json({ success: true, data: spotlightPost });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}


module.exports = SpotlightPost;
