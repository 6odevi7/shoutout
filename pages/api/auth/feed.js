// pages/api/feed.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch feed data from your database
      // This is a placeholder for your actual database query
      const feedData = await fetchFeedDataFromDatabase();

      // You can add pagination, filtering, etc. here
      const paginatedData = paginateFeedData(feedData, req.query.page, req.query.limit);

      res.status(200).json(paginatedData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching feed data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Placeholder function for database query
async function fetchFeedDataFromDatabase() {
  // Implement your database query here
  return [
    { id: 1, content: 'First post', author: 'User1', timestamp: new Date() },
    { id: 2, content: 'Second post', author: 'User2', timestamp: new Date() },
    // Add more mock data as needed
  ];
}

// Placeholder function for pagination
function paginateFeedData(data, page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return {
    data: data.slice(startIndex, endIndex),
    currentPage: page,
    totalPages: Math.ceil(data.length / limit),
    totalItems: data.length,
  };
}