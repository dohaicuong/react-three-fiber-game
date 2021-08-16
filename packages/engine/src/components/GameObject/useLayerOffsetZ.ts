import { useMemo } from 'react'
import { GameObjectLayer } from '../../state/gameObjects'

export const useLayerOffsetZ = (layer?: GameObjectLayer) => {
  const offsetZ = useMemo(() => {
    if (layer === 'ground') return -1
    if (layer === 'ground-decal') return 0.1
    if (layer === 'obstacle') return 0.2
    if (layer === 'item') return 0.3
    if (layer === 'character') return 0.5
    // if (layer === 'fx') return 4

    return 0
  }, [layer])

  return offsetZ
}