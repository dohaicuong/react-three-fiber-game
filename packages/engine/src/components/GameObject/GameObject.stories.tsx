import { ComponentMeta } from '@storybook/react'

import { Game } from '../Game'
import { GameObject } from '.'
import { Sprite } from '../Sprite'
import player from '../../assets/player.png'
import { Suspense } from 'react'
import { Html } from '@react-three/drei'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { gameObjectPosition, gameObjectState } from '../../state'

export default {
  title: 'engine/GameObject',
  component: GameObject,
} as ComponentMeta<typeof GameObject>

export const Default = () => (
  <Game
    camera={{
      position: [5, 0, 10],
      zoom: 64,
      near: 0.1,
      far: 64,
    }}
  >
    <Suspense fallback='Loadding...'>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Controls gameObjectId='player' />
      <Player id='player' />
    </Suspense>
  </Game>
)

const Controls = ({ gameObjectId }: { gameObjectId: string }) => {
  const setPosition = useSetRecoilState(gameObjectPosition(gameObjectId))
  const goLeft = () => setPosition(pre => ({ ...pre, x: pre.x - 1, direction: 'LEFT' }))
  const goRight = () => setPosition(pre => ({ ...pre, x: pre.x + 1, direction: 'RIGHT' }))

  const [state, setState] = useRecoilState(gameObjectState(gameObjectId))
  const changeState = () => setState(pre => pre === 'walk' ? 'idle' : 'walk')

  return (
    <Html position={[-5, 5, 0]}>
      <div style={{ width: 500 }}>
        <button onClick={goLeft}>
          left
        </button>
        <button onClick={goRight}>
          right
        </button>
        <button onClick={changeState}>
          {state === 'run' ? 'idle' : 'walk'}
        </button>
      </div>
    </Html>
  )
}

const Player = ({ id }: { id: string }) => {
  const state = useRecoilValue(gameObjectState(id))

  return (
    <GameObject id={id} layer='character' x={0} y={0}>
      <Sprite
        name={id}
        action={state}
        textureData={{
          path: player,
          frameSize: { width: 20, height: 20 },
          actionData: [
            { name: 'idle', frames: [[0, 0]] },
            { name: 'walk', frames: [[1, 2], [2, 2]], frameRate: 250 }
          ]
        }}
      />
    </GameObject>
  )
}