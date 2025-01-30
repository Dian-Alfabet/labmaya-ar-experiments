'use client'

import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import ThreeScene from './ThreeScene'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (!mesh?.current) {
      return null;
    }
    {/* @ts-ignore */}
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    {/* @ts-ignore */}
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    {/* @ts-ignore */}
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Duck(props: any) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}
export function Dog(props: any) {
  const { scene } = useGLTF('/dog.glb')

  return <primitive object={scene} {...props} />
}
// export function WaveCycle(props: any) {
//   const { scene, animations } = useGLTF('/water_cycle/scene.gltf')
//   const { actions } = useAnimations(animations, scene)
//   // Muat tekstur secara manual jika tidak muncul
//   const diffuseTexture = useTexture('/water_cycle/textures/material_0_diffuse.png')
//   const diffuseTexture = useTexture('/water_cycle/textures/material_0_emissive.png')

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         // Pastikan material memiliki tekstur yang benar
//         if (child.material) {
//           child.material.map = diffuseTexture
//           child.material.map.flipY = false // Jika tekstur terbalik
//           child.material.needsUpdate = true
//         }
//       }
//     })
//   }, [scene, diffuseTexture])

//   useEffect(() => {
//     if (actions.idle) {
//       actions.idle.play() // Menjalankan animasi "idle"
//     }
//   }, [actions])

//   return <primitive object={scene} {...props} />
// }

export function WaveCycle(props: any) {
  // const { scene, materials } = useGLTF('/water_cycle/scene.gltf')
    const { scene, animations, materials } = useGLTF('/water_cycle/scene.gltf')
    const { actions } = useAnimations(animations, scene)

  // Load berbagai tekstur
  const texture_0_diffuse = useTexture('/water_cycle/textures/material_0_diffuse.png')
  const material_0_emissive = useTexture('/water_cycle/textures/material_0_emissive.png')
  const material_0_normal = useTexture('/water_cycle/textures/material_0_normal.png')
  const material_0_occlusion = useTexture('/water_cycle/textures/material_0_occlusion.png')
  const material_0_specularGlossiness = useTexture('/water_cycle/textures/material_0_specularGlossiness.png')

  const texture_1_diffuse = useTexture('/water_cycle/textures/material_1_diffuse.png')
  const material_1_emissive = useTexture('/water_cycle/textures/material_1_emissive.png')
  const material_1_normal = useTexture('/water_cycle/textures/material_1_normal.png')
  const material_1_occlusion = useTexture('/water_cycle/textures/material_1_occlusion.png')
  const material_1_specularGlossiness = useTexture('/water_cycle/textures/material_1_specularGlossiness.png')

  const texture_4_diffuse = useTexture('/water_cycle/textures/material_4_diffuse.png')
  const material_4_emissive = useTexture('/water_cycle/textures/material_4_emissive.png')
  const material_4_normal = useTexture('/water_cycle/textures/material_4_normal.png')
  const material_4_occlusion = useTexture('/water_cycle/textures/material_4_occlusion.png')
  const material_4_specularGlossiness = useTexture('/water_cycle/textures/material_4_specularGlossiness.png')

  useEffect(() => {
    scene.traverse((child) => {
      {/* @ts-ignore */}
      if (child.isMesh && child.material) {
        {/* @ts-ignore */}
        switch (child.material.name) {
          case 'material_0':
            {/* @ts-ignore */}
            child.material.map = texture_0_diffuse
            {/* @ts-ignore */}
            child.material.emissiveMap = material_0_emissive
            {/* @ts-ignore */}
            child.material.normalMap = material_0_normal
            {/* @ts-ignore */}
            child.material.aoMap = material_0_occlusion
            {/* @ts-ignore */}
            // child.material.map.flipY = false // Jika tekstur terbalik
            // child.material.needsUpdate = true
            // child.material.specularMap = material_0_specularGlossiness
    {/* @ts-ignore */}
            child.material.color.set('white') // Bisa ditambahkan warna overlay
            break
          case 'material_1':
            {/* @ts-ignore */}
            child.material.map = texture_1_diffuse
            {/* @ts-ignore */}
            child.material.emissiveMap = material_1_emissive
            {/* @ts-ignore */}
            child.material.normalMap = material_1_normal
            {/* @ts-ignore */}
            child.material.aoMap = material_1_occlusion
            {/* @ts-ignore */}
            // child.material.map.flipY = false // Jika tekstur terbalik
            // child.material.needsUpdate = true
            // child.material.specularMap = material_1_specularGlossiness
            child.material.color.set('lightblue')
            break
          case 'material_4':

    {/* @ts-ignore */}
            child.material.map = texture_4_diffuse

    {/* @ts-ignore */}
            child.material.emissiveMap = material_4_emissive

    {/* @ts-ignore */}
            child.material.normalMap = material_4_normal

    {/* @ts-ignore */}
            child.material.aoMap = material_4_occlusion

    {/* @ts-ignore */}
            // child.material.map.flipY = false // Jika tekstur terbalik

    {/* @ts-ignore */}
            // child.material.needsUpdate = true
            // child.material.specularMap = material_4_specularGlossiness
            child.material.color.set('green')
            break
        }
    {/* @ts-ignore */}
        child.material.needsUpdate = true
      }
    })

  // useEffect(() => {
  //   scene.traverse((child) => {
  //     if (child.isMesh) {
  //       // Pastikan material memiliki tekstur yang benar
  //       if (child.material) {
  //         child.material.map = diffuseTexture
  //         child.material.map.flipY = false // Jika tekstur terbalik
  //         child.material.needsUpdate = true
  //       }
  //     }
  //   })
  // }, [scene, diffuseTexture])

  }, [scene, texture_0_diffuse, texture_1_diffuse, texture_4_diffuse])


  useEffect(() => {
    if (actions.idle) {
      actions.idle.play() // Menjalankan animasi "idle"
    }
  }, [actions])

  return <primitive object={scene} {...props} />
}


// export function WaveCycle(props: any) {
//   const { scene } = useGLTF('/water_cycle/scene.gltf')

//   // Load semua tekstur di luar useMemo/useEffect
//   const material_0_diffuse = useTexture('/water_cycle/textures/material_0_diffuse.png')
//   const material_0_emissive = useTexture('/water_cycle/textures/material_0_emissive.png')
//   const material_0_normal = useTexture('/water_cycle/textures/material_0_normal.png')
//   const material_0_occlusion = useTexture('/water_cycle/textures/material_0_occlusion.png')
//   const material_0_specularGlossiness = useTexture('/water_cycle/textures/material_0_specularGlossiness.png')

//   const material_1_diffuse = useTexture('/water_cycle/textures/material_1_diffuse.png')
//   const material_1_emissive = useTexture('/water_cycle/textures/material_1_emissive.png')
//   const material_1_normal = useTexture('/water_cycle/textures/material_1_normal.png')
//   const material_1_occlusion = useTexture('/water_cycle/textures/material_1_occlusion.png')
//   const material_1_specularGlossiness = useTexture('/water_cycle/textures/material_1_specularGlossiness.png')

//   const material_4_diffuse = useTexture('/water_cycle/textures/material_4_diffuse.png')
//   const material_4_emissive = useTexture('/water_cycle/textures/material_4_emissive.png')
//   const material_4_normal = useTexture('/water_cycle/textures/material_4_normal.png')
//   const material_4_occlusion = useTexture('/water_cycle/textures/material_4_occlusion.png')
//   const material_4_specularGlossiness = useTexture('/water_cycle/textures/material_4_specularGlossiness.png')

//   // Memetakan nama material dengan tekstur terkait
//   const textures = {
//     material_0: {
//       diffuse: material_0_diffuse,
//       emissive: material_0_emissive,
//       normal: material_0_normal,
//       occlusion: material_0_occlusion,
//       specularGlossiness: material_0_specularGlossiness,
//     },
//     material_1: {
//       diffuse: material_1_diffuse,
//       emissive: material_1_emissive,
//       normal: material_1_normal,
//       occlusion: material_1_occlusion,
//       specularGlossiness: material_1_specularGlossiness,
//     },
//     material_4: {
//       diffuse: material_4_diffuse,
//       emissive: material_4_emissive,
//       normal: material_4_normal,
//       occlusion: material_4_occlusion,
//       specularGlossiness: material_4_specularGlossiness,
//     },
//   }

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child.isMesh && child.material) {
//         const matName = child.material.name
//         const textureSet = textures[matName]

//         if (textureSet) {
//           child.material.map = textureSet.diffuse
//           child.material.emissiveMap = textureSet.emissive
          // child.material.normalMap = textureSet.normal
          // child.material.aoMap = textureSet.occlusion
          // child.material.specularMap = textureSet.specularGlossiness
//           child.material.needsUpdate = true
//         }
//       }
//     })
//   }, [scene]) // Tidak perlu dependensi textures karena nilainya statis

//   return <primitive object={scene} {...props} />
// }

export function ThreeSceneLayout() {
  return <ThreeScene />
}