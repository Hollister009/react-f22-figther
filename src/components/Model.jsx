export default function Model({ meshRef, model }) {
  const { scene, materials } = model

  // Enable wireframe for all materials in the model
  for (const materialName in materials) {
    materials[materialName].wireframe = true
  }

  return (
    <mesh ref={meshRef}>
      <primitive object={scene} />
    </mesh>
  )
}
