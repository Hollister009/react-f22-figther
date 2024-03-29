/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/f22.glb -T
*/
import { forwardRef, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Model = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/f22-transformed.glb')
  const meshRef = useRef()

  for (const materialName in materials) {
    materials[materialName].wireframe = true
  }

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes['F-22'].geometry}
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, -1 * (Math.PI / 2)]}
      />
      <axesHelper />
    </group>
  )
})

useGLTF.preload('/models/f22-transformed.glb')
