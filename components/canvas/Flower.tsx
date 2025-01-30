import React, { useState, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useThree, extend } from '@react-three/fiber'

// Menambahkan extend untuk menggunakan THREE.Sprite
extend({ Sprite: THREE.Sprite })

// Komponen untuk menampilkan penjelasan
const ExplanationText = ({ text }: { text: string }) => {
  return (
    <div className="explanation-text">
      <p>{text}</p>
    </div>
  )
}

// Komponen Marker
const AnnotationMarker = ({ position, label, onClick }: { position: THREE.Vector3, label: string, onClick: () => void }) => {
  const spriteRef = useRef<THREE.Sprite>(null)

  useEffect(() => {
    if (spriteRef.current) {
      const spriteMaterial = new THREE.SpriteMaterial({
        color: 0xff0000, // Warna marker
        transparent: true,
      })
      spriteRef.current.material = spriteMaterial
      spriteRef.current.position.set(position.x, position.y, position.z)
      spriteRef.current.scale.set(2, 2, 1) // Ukuran marker
    }
  }, [position])

  return (
    // Menggunakan <sprite /> setelah extend
    <sprite ref={spriteRef} onClick={onClick} />
  )
}

// Komponen untuk Fokus Kamera
const CameraFocus = ({ focusedObject }: any) => {
  const { camera } = useThree()

  useEffect(() => {
    if (focusedObject) {
      const newPos = focusedObject.clone().add(new THREE.Vector3(0, 0, 100)) // offset agar kamera tidak terlalu dekat
      camera.position.lerp(newPos, 0.1)
      camera.lookAt(focusedObject)
    }
  }, [focusedObject, camera])

  return null
}

// Komponen Utama untuk Menampilkan Bunga dan Anotasi
export function Flowers(props: any) {
  const { nodes, materials } = useGLTF('/generic_narcissus_flower/scene.gltf')
  const [focusedObject, setFocusedObject] = useState<any>(null)
  const [annotationText, setAnnotationText] = useState<string>("")

//   // Fungsi untuk menampilkan penjelasan berdasarkan bagian yang diklik
  const handleAnnotationClick = (position: THREE.Vector3, label: string) => {
    setFocusedObject(position)
    switch (label) {
      case 'batang':
        setAnnotationText("Batang bunga ini memiliki struktur yang kokoh dan panjang.");
        break;
      case 'daun':
        setAnnotationText("Daun bunga ini lebar dan berwarna hijau cerah.");
        break;
      // Tambahkan case lain untuk bagian lain dari bunga
      default:
        setAnnotationText("Penjelasan tidak tersedia.");
    }
  }

  return (
    <>
      <group {...props} dispose={null}>
        <group scale={0.01}>
          <group position={[0, 0.061, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              // @ts-ignore
              geometry={nodes.Cylinder002_narcissus_opague_1_0.geometry}
              material={materials.narcissus_opague_1}
            />
            <AnnotationMarker
              position={new THREE.Vector3(0, 0.061, 0)} 
              label="batang"
              onClick={() => handleAnnotationClick(new THREE.Vector3(0, 0.061, 0), 'batang')}
            />
          </group>
          <group position={[45.95, 106.829, -136.971]} rotation={[-1.515, 0.254, 0.952]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              // @ts-ignore
              geometry={nodes.Cylinder001_narcissus_opague_1_0.geometry}
              material={materials.narcissus_opague_1}
            />
            <AnnotationMarker
              position={new THREE.Vector3(45.95, 106.829, -136.971)} 
              label="daun"
              onClick={() => handleAnnotationClick(new THREE.Vector3(45.95, 106.829, -136.971), 'daun')}
            />
          </group>
        </group>
      </group>
      <CameraFocus focusedObject={focusedObject} />
      {/* <ExplanationText text={annotationText} /> */}
    </>
  )
}

useGLTF.preload('/generic_narcissus_flower/scene.gltf')
