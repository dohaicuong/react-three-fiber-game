import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { GameObjectLayer, gameObjectPosition, Position, useCreateGameObject } from '../../state/gameObjects'
import { useLayerOffsetZ } from './useLayerOffsetZ'

export type GameObjectProps = Partial<Position> & {
  id: string
  layer?: GameObjectLayer
  disabled?: boolean
}

export const GameObject: React.FC<GameObjectProps> = ({
  id,
  layer,
  disabled,
  x = 0,
  y = 0,
  children
}) => {
  // register game object to store
  const createGameObject = useCreateGameObject()
  useEffect(() => {
    createGameObject({
      id,
      position: { x, y, direction: 'RIGHT' },
      layer
    })
    // eslint-disable-next-line
  }, [id])

  const position = useRecoilValue(gameObjectPosition(id))
  const offsetZ = useLayerOffsetZ(layer)

  return (
    <group
      position={[
        position.x,
        position.y,
        (-y + offsetZ) / 100
      ]}
      scale={[
        position.direction === 'RIGHT' ? 1 : -1,
        1,
        1
      ]}
    >
      {children}
    </group>
  )
}