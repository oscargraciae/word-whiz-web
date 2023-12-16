import type { NextPage } from 'next'

import { Hero } from '../components/home/Hero'
import { Layout } from '../components/general/Layout'
import { Lessons } from '../components/home/Lessons';
import { useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { router } from '@trpc/server';
import { redirect } from 'next/dist/server/api-utils';
import { getServerSession } from 'next-auth';

export default function Home() {

  const router = useRouter()
  const { data: session, status } = useSession()

  // useEffect(() => {
  //   if (session && session.user) {
  //     router.push('/lessons')
  //   }
  // }, [])

  // if (status === 'loading') return <Layout><LoadingScreen /></Layout>

  return (
    <Layout>
      <div className='w-full'>
        <Hero />
      </div>
      <div className='container py-4 m-auto'>
        <div className='grid grid-cols-8'>
          <div id='content' className='flex flex-col flex-1 col-span-8'>
            <Lessons />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx)
  console.log('Session ======>', session)
  if (session && session.user) {
    return {
      redirect: {
        destination: '/lessons',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
