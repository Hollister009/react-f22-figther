import { useEffect, useState } from 'react'

const AircraftControls = ({ target }) => {
  const [controlInputs, setControlInputs] = useState({
    pitch: 0,
    yaw: 0,
    roll: 0,
  })

  const handleKeyDown = (e) => {
    switch (e.code) {
      case 'KeyW':
        setControlInputs((prev) => ({ ...prev, pitch: 0.05 }))
        break
      case 'KeyS':
        setControlInputs((prev) => ({ ...prev, pitch: -0.05 }))
        break
      case 'KeyA':
        setControlInputs((prev) => ({ ...prev, roll: 0.05 }))
        break
      case 'KeyD':
        setControlInputs((prev) => ({ ...prev, roll: -0.05 }))
        break
      case 'KeyQ':
        setControlInputs((prev) => ({ ...prev, yaw: 0.05 }))
        break
      case 'KeyE':
        setControlInputs((prev) => ({ ...prev, yaw: -0.05 }))
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

  useEffect(() => {
    if (target && target.current) {
      target.current.rotation.x += controlInputs.roll
      target.current.rotation.y += controlInputs.yaw
      target.current.rotation.z += controlInputs.pitch
    }
  }, [target, controlInputs])

  return null
}

export default AircraftControls
