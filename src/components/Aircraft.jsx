import { useState, useEffect, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useControls } from 'leva'

import { useAircraftControls } from '../hooks'
import Model from './Model'
import CameraControls from './CameraControls'
import AircraftControls from './AircraftControls'

const Aircraft = () => {
  const model = useLoader(GLTFLoader, './models/f22.glb')
  const [target, setTarget] = useState(null)
  const meshRef = useRef(null)

  const onRotationChange = ({ x, y, z }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = x * Math.PI / 180
      meshRef.current.rotation.y = y * Math.PI / 180
      meshRef.current.rotation.z = z * Math.PI / 180
    }
  }

  useAircraftControls(target)

  useControls('F22', {
    position: {
      x: 0,
      y: 2,
      z: 0,
      onChange: (v) => {
        meshRef.current.position.copy(v)
      }
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      onChange: onRotationChange
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
      <AircraftControls target={target} />
    </>
  )
}

export default Aircraft
