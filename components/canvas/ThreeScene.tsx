import React, { useRef, useEffect, useState } from 'react'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import './styles.css'

const ThreeScene = () => {
  const [annotationPosition, setAnnotationPosition] = useState({ x: 0, y: 0, opacity: 1 })

  const meshRef = useRef<THREE.Mesh>(null!)
  const spriteRef = useRef<THREE.Sprite>(null!)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  // Create annotation texture (Canvas)
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const x = 32, y = 32, radius = 30
      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgb(255, 255, 255)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.stroke()

      ctx.fillStyle = 'rgb(255, 255, 255)'
      ctx.font = '32px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('1', x, y)
    }

    // Create the sprite using the canvas
    const texture = new THREE.CanvasTexture(canvas)
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      alphaTest: 0.5,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.position.set(250, 250, 250)
    sprite.scale.set(60, 60, 1)
    spriteRef.current = sprite
  }, [])

  // Update annotation position based on camera and sprite
  useEffect(() => {
    const updatePosition = () => {
      if (!meshRef.current || !cameraRef.current || !spriteRef.current) return

      // Get mesh and sprite position
      const vector = new THREE.Vector3(250, 250, 250)
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      vector.project(cameraRef.current)

      // Normalize to screen coordinates
      const x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio))
      const y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio))

      setAnnotationPosition({ x, y, opacity: spriteRef.current.position.distanceTo(cameraRef.current.position) > meshRef.current.position.distanceTo(cameraRef.current.position) ? 0.25 : 1 })
    }

    // Update position at each frame
    const interval = setInterval(updatePosition, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <mesh ref={meshRef} position={[0, 0, 0]} scale={3}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="royalblue" />
        </mesh>
        <mesh ref={meshRef} position={[10, 0, -15]} scale={3}>
            <sphereGeometry args={[4, 4, 4]} />
            <meshBasicMaterial color="white" />
            <Html center>
                <span >Cube</span>
                <p color='white'>In geometry, a cube is a three-dimensional solid object.</p>
            </Html>
        </mesh>
        {/* <Annotation position={[3, 3, 3]}>
        </Annotation> */}
        <sprite ref={spriteRef} />
        <perspectiveCamera ref={cameraRef} position={[3, 3, 5]} />
      </>

      

      {/* <div
        className="annotation"
        style={{
          top: `${annotationPosition.y}px`,
          left: `${annotationPosition.x}px`,
          opacity: annotationPosition.opacity,
        }}
      >
        <p>Cube</p>
        <p>In geometry, a cube is a three-dimensional solid object bounded by six square faces, facets or sides, with three meeting at each vertex.</p>
      </div> */}

      {/* <canvas id="number" width="64" height="64" style={{ display: 'none' }} /> */}
    </>
  )
}

export default ThreeScene
