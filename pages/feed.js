import dynamic from 'next/dynamic'

const Feed = dynamic(() => import('../components/Feed'))
export default Feed