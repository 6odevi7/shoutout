import Home from '../components/Home'
import ShoutoutFeed from '../client/components/ShoutoutFeed';

async function fetchStaticData() {
  try {
    const response = await fetch('http://localhost:3000/api/feed');
    if (!response.ok) {
      throw new Error('Failed to fetch feed data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching feed data:', error);
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
    };
  }
}

const HomePage = ({ staticData }) => {
  return (
    <Home staticData={staticData}>
      {/* Other components */}
      <ShoutoutFeed />
    </Home>
  );
};

export default HomePage

export async function getStaticProps() {
  const staticData = await fetchStaticData()
 
  return {
    props: { staticData },
    revalidate: 30 // Revalidate every 60 seconds
  }
}
