import { atom, atomFamily, selectorFamily, useRecoilCallback } from 'recoil'

export type GameObject = {
  id: string
  position: Position
  layer?: GameObjectLayer
  state?: string
}
export type Position = {
  x: number
  y: number
  direction?: Direction
}
export type Direction = 'LEFT' | 'RIGHT'
export type GameObjectLayer = | 'ground' | 'ground-decal' | 'wall' | 'water' | 'obstacle' | 'character' | 'item'

export const gameObjectsIndex = atom<Set<string>>({
  key: 'gameObjects/index',
  default: new Set<string>()
})
export const gameObjectsStore = atomFamily<GameObject, string>({
  key: 'gameObjects/state',
  default: {} as any
})

const defaultPosition: Position = {  x: 0, y: 0, direction: 'RIGHT' }
export const gameObjectPosition = selectorFamily<Position, string>({
  key: 'gameObject/position',
  get: id => ({ get }) => {
    return get(gameObjectsStore(id)).position || defaultPosition
  },
  set: id => ({ set }, newPos) => {
    set(
      gameObjectsStore(id),
      pre => {
        return {
          ...pre,
          position: newPos as any,
        }
      }
    )
  }
})

export const gameObjectState = selectorFamily<string | undefined, string>({
  key: 'gameObject/state',
  get: id => ({ get }) => {
    return get(gameObjectsStore(id)).state
  },
  set: id => ({ set }, newState) => {
    set(
      gameObjectsStore(id),
      pre => {
        return {
          ...pre,
          state: newState as any,
        }
      }
    )
  }
})

// create gameObject
export const useCreateGameObject = () => {
  const createGameObject = useRecoilCallback(({ set }) => async (gameObject: GameObject) => {
    set(gameObjectsIndex, pre => pre.add(gameObject.id))
    set(gameObjectsStore(gameObject.id), gameObject)
  })
  return createGameObject
}

// get gameObjectByPosition
export const useGameObjectByPosition = () => {
  const getGameObjectByPosition = useRecoilCallback(({ snapshot }) => async (position: Position) => {
    const gameObjectIdsSet = await snapshot.getPromise(gameObjectsIndex)
    const ids = Array.from(gameObjectIdsSet)
    for(const id of ids) {
      const gameObject = await snapshot.getPromise(gameObjectsStore(id))

      if(gameObject.position.x === position.x && gameObject.position.y === position.y) {
        return gameObject
      }
    }
  })

  return getGameObjectByPosition
}