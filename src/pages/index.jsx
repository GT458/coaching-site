
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import ResponsiveAppBar from '../components/navigation/NavBar'
import { useState, useMemo, forwardRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { Html, useGLTF, Scroll, ScrollControls, useScroll, useTexture } from '@react-three/drei'
import useRefs from 'react-use-refs'
const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here
// 
export default function Page(props) {

  // const [rotation, setRotation] = useState([0, 0, 0])
  // const obj = useLoader(OBJLoader, '/dumbbell.obj')
  // const texture = useTexture('/img/db_texture.jpg')
  return (
    <div className='absolute top-0 left-0 w-screen flex flex-col items-center'>
      <div >
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, -3.2, 40], fov: 12 }}>
          <ScrollControls pages={1}>
            <Scroll html>
              <div className='test'>sup</div>
              <div className='test'>lol</div>
              <div className='test'>lol</div>
              <div className='test'>lol</div>
              <div className='test'>lol</div>
            </Scroll>
            <Composition />

          </ScrollControls>
        </Canvas>
      </div>

    </div>

  )
}

function Composition({ ...props }) {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  const [group, db, keyLight, stripLight, fillLight] = useRefs()
  const textureRed = useTexture('/db_texture.jpg')

  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 4, 1 / 4)
    const r2 = scroll.range(1 / 4, 1 / 4)
    const r3 = scroll.visible(4 / 5, 1 / 5)
    db.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1) + r2 * 0.33
    // mbp14.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1) - r2 * 0.39
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (-Math.PI / 1.45) * r2, 4, delta)
    // group.current.position.x = THREE.MathUtils.damp(group.current.position.x, (-width / 7) * r2, 4, delta)
    group.current.scale.x = group.current.scale.y = group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, 1 + 0.24 * (1 - rsqw(r1)), 4, delta)
    keyLight.current.position.set(0.25 + -15 * (1 - r1), 4 + 11 * (1 - r1), 3 + 2 * (1 - r1))
    // left.current?.classList.toggle('show', r3)
    // right.current?.classList.toggle('show', r3)
  })
  return (
    <>
      <spotLight position={[0, -width * 0.7, 0]} intensity={0.5} />
      <directionalLight ref={keyLight} castShadow intensity={6}>
        <orthographicCamera attachObject={['shadow', 'camera']} args={[-10, 10, 10, -10, 0.5, 30]} />
      </directionalLight>
      <group ref={group} position={[0, -height / 2.65, 0]} {...props}>
        <spotLight ref={stripLight} position={[width * 2.5, 0, width]} angle={0.19} penumbra={1} intensity={0.25} />
        <spotLight ref={fillLight} position={[0, -width / 2.4, -width * 2.2]} angle={0.2} penumbra={1} intensity={2} distance={width * 3} />
        <DB ref={db} texture={textureRed} scale={width / 67}>
        </DB>

      </group>
    </>
  )
}

const DB = forwardRef(({ texture, children, ...props }, ref) => {
  const obj = useLoader(OBJLoader, '/dumbbell.obj')
  // const texture = useTexture('/img/db_texture.jpg')
  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);

  return (
    <group {...props} dispose={null}>
      <group ref={ref} position={[0, 0, 120]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={geometry} scale={0.07}>
          <meshPhysicalMaterial map={texture} />
        </mesh>
      </group>
      {children}

    </group>
  )
})

const Tag = forwardRef(({ head, stat, expl, ...props }, ref) => {
  return (
    <Html ref={ref} className="data" center {...props}>
      <div>{head}</div>
      <h1>{stat}</h1>
      <h2>{expl}</h2>
    </Html>
  )
})


// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// Page.canvas = (props) => {
//   <Logo scale={0.5} route='/deez' position-y={-1} />
// }
export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
