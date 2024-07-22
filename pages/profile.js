import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const Profile = dynamic(() => import('../components/Profile'), {
  loading: () => <p>Loading profile...</p>,
  ssr: false
})

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return <Profile />
}
