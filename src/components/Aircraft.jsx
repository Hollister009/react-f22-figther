import { useState, useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useControls } from 'leva'

import Model from './Model'
import CameraControls from './CameraControls'

const Aircraft = () => {
  const model = useLoader(GLTFLoader, './models/f22.glb')
  const [target, setTarget] = useState(null)
  const meshRef = useRef(null)

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

  useEffect(() => {
    if (meshRef.current) {
      setTarget(meshRef)
    }
  }, [meshRef.current])

  return (
    <>
      <Model meshRef={meshRef} model={model} />
      <CameraControls target={target} />
    </>
  )
}

export default Aircraft
