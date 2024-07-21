import DynamicContent from '../components/DynamicContent'

export default function DynamicPage({ dynamicData }) {
  return <DynamicContent data={dynamicData} />
}

export async function getServerSideProps(context) {
  const dynamicData = await fetchDynamicData(context)
  return {
    props: { dynamicData }
  }
}