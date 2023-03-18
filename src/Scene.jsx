import { OrbitControls, Stats } from '@react-three/drei'

import Skybox from './components/Skybox'
import Terrain from './components/Terrain'
import Aircraft from './components/Aircraft'

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Skybox imagePrefix="/textures/skybox/sh" imageSuffix=".png" />
      <Aircraft />
      <Terrain />
      <OrbitControls />
      <axesHelper />
      <Stats />
    </>
  )
}
