import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useControls } from 'leva'

import Terrain from './Terrain'
import Skybox from './Skybox'

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
      <Skybox imagePrefix="/textures/skybox/sh" imageSuffix=".png" />
      <ambientLight intensity={0.3} />
      <Model />
      <Terrain />
      <OrbitControls />
      <axesHelper />
      <Stats />
    </>
  )
}
