import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

function App() {
  const model = useLoader(OBJLoader, './models/f22.obj');
  const newMaterial = new THREE.MeshBasicMaterial({ color: 'lime' });

  return (
    <Canvas>
      <mesh material={newMaterial}>
        <primitive object={model} />
      </mesh>
      <OrbitControls autoRotate/>
      <axesHelper />
      <Stats />
    </Canvas>
  );
}

export default App;
