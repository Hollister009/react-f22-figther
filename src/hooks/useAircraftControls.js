import { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGamepads } from 'react-gamepads'

const axesDeadzone = [-0.11, 0.11]

const useAircraftControls = (target) => {
  const [gamepads, setGamepads] = useState([])
  const [controlInputs, setControlInputs] = useState({
    pitch: 0,
    yaw: 0,
    roll: 0
  })

  useGamepads((gamepads) => {
    setGamepads(Object.values(gamepads))
  })

  const handleGamepadInput = () => {
    if (!gamepads[0]) return

    gamepads[0].axes.forEach((axe, index) => {
      if (axe < Math.min(...axesDeadzone) || axe > Math.max(...axesDeadzone)) {
        if (index === 0) {
          setControlInputs((prev) => ({ ...prev, roll: axe * 0.01 }))
        } else if (index === 1) {
          setControlInputs((prev) => ({ ...prev, pitch: axe * 0.01 }))
        }
      }
    })
  }

  const handleKeyDown = (e) => {
    switch (e.code) {
      case 'KeyW':
        setControlInputs((prev) => ({ ...prev, pitch: -0.01 }))
        break
      case 'KeyS':
        setControlInputs((prev) => ({ ...prev, pitch: 0.01 }))
        break
      case 'KeyA':
        setControlInputs((prev) => ({ ...prev, roll: -0.01 }))
        break
      case 'KeyD':
        setControlInputs((prev) => ({ ...prev, roll: 0.01 }))
        break
      case 'KeyQ':
        setControlInputs((prev) => ({ ...prev, yaw: 0.01 }))
        break
      case 'KeyE':
        setControlInputs((prev) => ({ ...prev, yaw: -0.01 }))
        break
      default:
        break
    }
  }

  const handleKeyUp = (e) => {
    switch (e.code) {
      case 'KeyW':
      case 'KeyS':
        setControlInputs((prev) => ({ ...prev, pitch: 0 }))
        break
      case 'KeyA':
      case 'KeyD':
        setControlInputs((prev) => ({ ...prev, roll: 0 }))
        break
      case 'KeyQ':
      case 'KeyE':
        setControlInputs((prev) => ({ ...prev, yaw: 0 }))
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    // handleGamepadInput()

    if (target && target.current) {
      target.current.rotation.x += controlInputs.roll
      target.current.rotation.y += controlInputs.yaw
      target.current.rotation.z += controlInputs.pitch

      const lerpSpeed = 0.015

      if (controlInputs.roll === 0) {
        target.current.rotation.x *= 1 - lerpSpeed
      }
      if (controlInputs.yaw === 0) {
        target.current.rotation.y *= 1 - lerpSpeed
      }
      if (controlInputs.pitch === 0) {
        target.current.rotation.z *= 1 - lerpSpeed
      }
    }
  })
}

export default useAircraftControls
