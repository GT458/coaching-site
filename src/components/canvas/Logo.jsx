import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useTexture } from '@react-three/drei'


export default function Logo({ route, ...props }) {

  const [rotation, setRotation] = useState([0, 0, 0])
  const obj = useLoader(OBJLoader, '/dumbbell.obj')
  const texture = useTexture('/img/db_texture.jpg')
  const scroll = useScroll();
  // console.log(scroll);
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

  const mesh = <mesh rotation={rotation} geometry={geometry} scale={0.07}>
    <meshPhysicalMaterial map={texture} />
  </mesh>




  // const scroll = useScroll();
  // scroll.offset
  useFrame((state, delta) => {

    setRotation([0, 1, 1])
    // const t = scroll.range(0, 1 / 2);
    // scroll.range(0, 1/3)
    // setRotation([Math.sin(t) * (Math.PI / 8), Math.cos(t) * (Math.PI / 8), Math.sin(t) * (Math.PI / 8)]);
    // setRotation([data.range(0, 1/2)]);
    // mesh.rotation.y = Math.sin(t) * (Math.PI / 8)
    // mesh.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.rotation.z -= delta / 4
  })

  return (


    <group>

      {mesh}
    </group>


  )
}
