import { useSession } from 'next-auth/react'
import React from 'react'
import { Layout } from '../components/general/Layout'
import { LoadingScreen } from '../components/general/Loading'
import { VocabularyLearned } from '../components/vocabulary/VocabularyLearned'

export default function VocabularyPage() {
  const { data: session, status } = useSession()

  // if (status === 'loading') return <Loading />

  return (
    <Layout>
      <div className='container py-6 m-auto'>
        { session && session.user ? <VocabularyLearned /> : <LoadingScreen /> }
      </div>
    </Layout>
  )
}
