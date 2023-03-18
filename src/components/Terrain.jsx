import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const Terrain = () => {
  const mesh = useRef()
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(25, 25, 75, 75)
    const pos = geometry.getAttribute('position')
    const hVerts = geometry.parameters.heightSegments + 1
    const wVerts = geometry.parameters.widthSegments + 1

    for (let j = 0; j < hVerts; j++) {
      for (let i = 0; i < wVerts; i++) {
        pos.array[3 * (j * wVerts + i) + 2] = Math.sin(i / 2) * Math.sin(j / 2)
      }
    }

    pos.needsUpdate = true

    return geometry
  }, [])

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhongMaterial
        attach="material"
        color="hotpink"
        specular="hotpink"
        shininess={3}
        // flatShading
        wireframe
      />
    </mesh>
  )
}

export default Terrain
