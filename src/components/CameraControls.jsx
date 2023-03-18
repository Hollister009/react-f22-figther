import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'

const CameraControls = ({ target }) => {
  const { camera } = useThree()
  const [thirdPersonView, setThirdPersonView] = useState(false)
  const transitionSpeed = 0.1
  const desiredOffset = useRef({ x: 0, y: 5, z: 10 }) // Adjust the desired offset according to your needs

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        setThirdPersonView((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useFrame(() => {
    if (target && target.current) {
      if (thirdPersonView) {
        camera.position.lerp(
          target.current.position.clone().add(desiredOffset.current),
          transitionSpeed
        )
      } else {
        camera.position.lerp(target.current.position, transitionSpeed)
      }

      // camera.lookAt(target.current.position)
    }
  })

  return null
}

export default CameraControls
