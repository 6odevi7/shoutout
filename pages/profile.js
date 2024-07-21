import dynamic from 'next/dynamic'

const Profile = dynamic(() => import('../components/Profile'))
export default Profile
