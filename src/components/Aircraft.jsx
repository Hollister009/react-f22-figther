import { useState, useEffect, useRef } from 'react'
import { useControls } from 'leva'

import { useAircraftControls } from '../hooks'
import { Model } from './F22'
import CameraControls from './CameraControls'

const Aircraft = () => {
  const [target, setTarget] = useState(null)
  const modelRef = useRef(null)

  const onRotationChange = ({ x, y, z }) => {
    if (modelRef.current) {
      modelRef.current.rotation.x = (x * Math.PI) / 180
      modelRef.current.rotation.y = (y * Math.PI) / 180
      modelRef.current.rotation.z = (z * Math.PI) / 180
    }
  }

  useAircraftControls(target)

  useControls('F22', {
    position: {
      x: 0,
      y: 2,
      z: 0,
      onChange: (v) => {
        modelRef.current.position.copy(v)
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
    if (modelRef.current) {
      setTarget(modelRef)
    }
  }, [modelRef.current])

  return (
    <>
      <Model ref={modelRef} />
      <CameraControls target={target} />
    </>
  )
}

export default Aircraft
