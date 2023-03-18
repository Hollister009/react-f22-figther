import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

const vec3 = new Vector3()

const CameraControls = ({ target }) => {
  const [thirdPersonView, setThirdPersonView] = useState(false)
  const desiredOffset = useRef({ x: 0, y: 2, z: 5 })
  const transitionSpeed = 0.1

  vec3.set(
    desiredOffset.current.x,
    desiredOffset.current.y,
    desiredOffset.current.z
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        setThirdPersonView((prevState) => !prevState)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame((state) => {
    if (target && target.current) {
      if (thirdPersonView) {
        state.camera.position.lerp(
          target.current.position.clone().add(vec3),
          transitionSpeed
        )
      }
      state.camera.lookAt(target.current.position)
    }
  })

  return null
}

export default CameraControls
