import Home from '../components/Home'

async function fetchStaticData() {
  // Fetch your static data here
  // For example:
  // const res = await fetch('https://api.example.com/static-data')
  // return res.json()
  
  // For now, let's return some placeholder data
  return {
    title: "Welcome to Shoutout!",
    description: "A real-time user status feed commenting system."
  }
}

export default Home

export async function getStaticProps() {
  const staticData = await fetchStaticData()
  
  return {
    props: { staticData },
    revalidate: 60 // Revalidate every 60 seconds
  }
}