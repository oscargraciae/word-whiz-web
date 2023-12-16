import React, { useEffect } from "react";
import { LayoutDashboard } from "../components/general/LayoutDashboard";
import { Lessons } from "../components/home/Lessons";
import { trpc } from '../utils/trpc'

export default function DashboardPage () {
  const words = trpc.useQuery(['lesson.getWords'])
  console.log('words', JSON.stringify(words?.data?.words))
  // useEffect(() => {
  //   if (words?.data?.words)  {
  //     for (let i = 0; i < words?.data?.words.length; i++) {
  //       console.log('word', words?.data?.words[i].wordEnglish)
  //       console.log('word', words?.data?.words[i].id)
  //     }
  //   }
  // }, [words.isLoading, words.data?.words])

  return (
    <LayoutDashboard>
      <div className='container py-4 m-auto'>
        <div className='grid grid-cols-8'>
          <div id='content' className='flex flex-col flex-1 col-span-8'>
            <Lessons />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  )
}
