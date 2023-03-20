import { useState, useEffect } from 'react'

const useGamepad = () => {
  const [gamepad, setGamepad] = useState(null)

  const handleGamepadConnected = (event) => {
    console.log('Gamepad connected:', event.gamepad)
    setGamepad(event.gamepad)
  }

  const handleGamepadDisconnected = (event) => {
    console.log('Gamepad disconnected:', event.gamepad)
    setGamepad(null)
  }

  useEffect(() => {
    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
    }
  }, [])

  return gamepad
}

export default useGamepad
