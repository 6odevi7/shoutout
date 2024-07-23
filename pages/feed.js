import dynamic from 'next/dynamic'
import { NextApiRequest, NextApiResponse } from 'next'

const Feed = dynamic(() => import('../components/Feed'))

export default Feed

export async function getServerSideProps({ req, res }) {
  if (req.method === 'GET') {
    try {
      // Your feed data fetching logic here
      const feedData = await fetchFeedData()
      return { props: { feedData } }
    } catch (error) {
      res.status(200).json(paginatedData);
    } catch (error) {
      res.statusCode = 500;
      res.json({ message: 'Error fetching feed data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.statusCode = 405;
    res.json({ message: `Method ${req.method} Not Allowed` });
  }

async function fetchFeedData() {
  // Implement your data fetching logic here
  // This is just a placeholder
  return { posts: [] }
}
