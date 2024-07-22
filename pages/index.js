import Home from '../components/Home'
import ShoutoutFeed from '../client/components/ShoutoutFeed';

async function fetchStaticData() {
  try {
    const response = await fetch('/pages/api/feed');
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

const HomePage = ({ feedData }) => {
  return (
    <Home feedData={feedData}>
      <ShoutoutFeed initialData={feedData} />
    </Home>
  );
};

export default HomePage

export async function getStaticProps() {
  const feedData = await fetchStaticData()
 
  return {
    props: { feedData },
    revalidate: 30
  }
}
