import type { NextPage } from 'next'

import { Hero } from '../components/home/Hero'
import { Layout } from '../components/general/Layout'
import { Lessons } from '../components/home/Lessons';

export default function Home() {
  return (
    <Layout>
      <div className='w-full'>
        <Hero />
      </div>
      <div className='container m-auto'>
        <div className='grid grid-cols-8'>
          <div id='content' className='flex flex-col flex-1 col-span-8'>
            <Lessons />
          </div>
          {/* <div id='sidebar' className='col-span-2'>
            <h1>Sidebar</h1>
          </div> */}
        </div>
      </div>
    </Layout>
  )
}
