'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import './styles.css';

const Logo = dynamic(() => import('../components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('../components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('../components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('../components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className="loading-container">
      <svg fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('../components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className="container">
        <div className="text-container md">
          <h1>Lab Maya AR Playground Research</h1>
        </div>

        <div className="view-container md">
          <View className="loading-container">
            <Suspense fallback={null}>
              <Logo route="/blob" scale={0.6} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>

      <div className="row">
        <View orbit className="loading-container">
          <Suspense fallback={null}>
            <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
            <Common color={'lightpink'} />
          </Suspense>
        </View>
        <br />
        <br />
        <br />
        <View orbit className="loading-container">
          <Suspense fallback={null}>
            <Duck route="/blob" scale={2} position={[0, -1.6, 0]} />
            <Common color={'lightblue'} />
          </Suspense>
        </View>
      </div>
    </>
  )
}
