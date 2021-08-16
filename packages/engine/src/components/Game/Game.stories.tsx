import { Html, OrbitControls } from '@react-three/drei'
import { ComponentMeta } from '@storybook/react'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { Game } from '.'
import { useGameLoop } from '../../hooks'
import { gameState } from '../../state'

export default {
  title: 'engine/Game',
  component: Game,
} as ComponentMeta<typeof Game>

export const Default = () => (
  <Game
    camera={{
      position: [5, 0, 10],
      zoom: 64,
      near: 0.1,
      far: 64,
    }}
  >
    <OrbitControls enablePan enableZoom enableRotate />
    <ambientLight />
    <PauseButton />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Game>
)

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useGameLoop(() => (mesh.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const PauseButton = () => {
  const [game, setGame] = useRecoilState(gameState)

  const togglePause = () => {
    setGame(pre => {
      return {
        ...pre,
        paused: !pre.paused
      }
    })
  }

  return (
    <Html position={[0, 2, 0]}>
      <button onClick={togglePause}>
        {game.paused ? 'play' : 'pause'}
      </button>
    </Html>
  )
}