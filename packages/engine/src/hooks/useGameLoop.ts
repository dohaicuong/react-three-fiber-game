import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { gameState } from '../state/game'

export type UseGameLoopCallback = (time: number, delta: number) => void 

export const useGameLoop = (callback: UseGameLoopCallback, condition = true) => {
  const { paused } = useRecoilValue(gameState)
  
  const active = useRef(false)
  active.current = !paused && condition

  useFrame(({ clock }, delta) => {
    const time = clock.oldTime // clock.elapsedTime / 1000;

    if(active.current) {
      callback(time, delta)
    }
  })

  return active.current
}