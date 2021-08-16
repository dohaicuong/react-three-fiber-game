import { atom } from 'recoil'

export type GameSettings = {
  movementDuration: number
  cameraZoom: number
}

export type GameState = {
  settings: GameSettings
  paused: boolean
}

export const gameState = atom<GameState>({
  key: 'gameState',
  default: {
    settings: {
      movementDuration: 250,
      cameraZoom: 64,
    },
    paused: false
  },
})
