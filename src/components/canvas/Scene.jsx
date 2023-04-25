import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { useScroll } from '@react-three/drei'
import Scroll, { ScrollTicker } from './Scroll'
export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Scroll>
      <Canvas camera={{ position: [100, 60, 10] }} style={{ position: 'fixed' }} {...props}>
        <directionalLight intensity={0.75} />
        <ambientLight intensity={0.75} />
        {children}
        <ScrollTicker />
        <Preload all />
        {/* <OrbitControls /> */}

      </Canvas>
    </Scroll>
  )
}
