import { useRef } from 'react'
import { TextureDataAction } from '.'
import { useGameLoop } from '../../hooks'

export const useAnimateFrame = (callback: (frame: number) => void, action?: TextureDataAction) => {
  const interval = useRef<number>()
  const currentFrame = useRef<number>(0)

  useGameLoop(time => {
    if(!action) return

    const { frames, frameRate } = action
    if(!frameRate || frames.length < 2) return

    if(interval.current == null) interval.current = time

    if(time >= interval.current + frameRate) {
      interval.current = time

      currentFrame.current = currentFrame.current === (frames.length - 1) 
        ? 0
        : currentFrame.current + 1

      callback(currentFrame.current)
    }
  })
}