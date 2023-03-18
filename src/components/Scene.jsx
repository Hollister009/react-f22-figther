import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useControls } from 'leva'

import Terrain from './Terrain'

function Model() {
  const meshRef = useRef()
  const { scene, materials } = useLoader(GLTFLoader, './models/f22.glb')

  useControls('F22', {
    position: {
      x: 0,
      y: 2,
      z: 0,
      onChange: (v) => {
        meshRef.current.position.copy(v)
      }
    }
  })

  // Enable wireframe for all materials in the model
  for (const materialName in materials) {
    materials[materialName].wireframe = true
  }

  return (
    <mesh ref={meshRef}>
      <primitive object={scene} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Environment preset="city" background />
      <Model />
      <Terrain />
      <OrbitControls />
      <axesHelper />
      <Stats />
    </>
  )
}
