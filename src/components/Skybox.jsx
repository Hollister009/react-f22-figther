import { useLayoutEffect } from 'react'
import { CubeTextureLoader } from 'three'
import { useThree } from '@react-three/fiber'

const Skybox = ({ imagePrefix, imageSuffix }) => {
  const { scene } = useThree()

  useLayoutEffect(() => {
    const loader = new CubeTextureLoader()
    const urls = [
      `${imagePrefix}_ft${imageSuffix}`,
      `${imagePrefix}_bk${imageSuffix}`,
      `${imagePrefix}_up${imageSuffix}`,
      `${imagePrefix}_dn${imageSuffix}`,
      `${imagePrefix}_rt${imageSuffix}`,
      `${imagePrefix}_lf${imageSuffix}`
    ]

    const texture = loader.load(urls)
    scene.background = texture

    return () => {
      scene.background.dispose()
    }
  }, [imagePrefix, imageSuffix, scene])

  return null
}

export default Skybox
