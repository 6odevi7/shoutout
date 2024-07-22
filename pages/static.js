export default function StaticPage({ staticData }) {
  return <StaticContent data={staticData} />
}

export async function getStaticProps() {
  // Implement fetchStaticData function
  const fetchStaticData = async () => {
    // Replace this with your actual data fetching logic
    return { title: "Static Page", content: "This is static content" };
  };

  const staticData = await fetchStaticData()
  return {
    props: { staticData },
    revalidate: 60
  }
}
