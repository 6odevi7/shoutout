export default async function handler(req, res) {
  // Simulate fetching posts from a database
  const posts = [
    { id: 1, content: 'First shoutout!', author: 'User1' },
    { id: 2, content: 'Hello, Shoutout!', author: 'User2' },
  ];
  res.status(200).json(posts);
}

export const config = {
  runtime: 'edge',
};