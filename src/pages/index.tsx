import type { NextPage } from 'next'

import { Hero } from '../components/home/Hero'
import { Layout } from '../components/general/Layout'
import { trpc } from '../utils/trpc';

export default function Home() {
  return (
    <Layout>
      <div className='w-full'>
        <Hero />
      </div>
    </Layout>
  )
}

// export const getServerSideProps = async () => {}
