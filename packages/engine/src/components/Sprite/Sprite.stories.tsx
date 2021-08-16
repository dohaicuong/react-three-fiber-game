import { ComponentMeta } from '@storybook/react'

import { Game } from '../Game'
import { Sprite } from '.'

import { Suspense, useState } from 'react'
import player from '../../assets/player.png'
import { Html } from '@react-three/drei'

export default {
  title: 'engine/Sprite',
  component: Sprite,
} as ComponentMeta<typeof Sprite>

export const Default = () => {
  const [action, setAction] = useState('idle')
  const changeAction = () => setAction(pre => pre === 'idle' ? 'walk' : 'idle')

  return (
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
        <Html position={[-2, 1, 0]}>
          <button onClick={changeAction}>
            {action === 'idle' ? 'walk' : 'idle'}
          </button>
        </Html>

        <Sprite
          position={[-3, 1, 0]}
          name='player'
          action={action}
          textureData={{
            path: player,
            frameSize: { width: 20, height: 20 },
            actionData: [
              { name: 'idle', frames: [[0, 0]] },
              { name: 'walk', frames: [[1, 2], [2, 2]], frameRate: 250 }
            ]
          }}
        />

        <Sprite
          position={[-3, -1, 0]}
          name='player2'
          action='run'
          textureData={{
            path: player,
            frameSize: { width: 20, height: 20 },
            actionData: [
              { name: 'idle', frames: [[0, 0]] }
            ]
          }}
        />
      </Suspense>
    </Game>
  )
}
