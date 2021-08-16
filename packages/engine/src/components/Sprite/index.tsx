import { forwardRef, useEffect, useMemo, useCallback } from 'react'
import { MeshLambertMaterialProps, MeshProps, PlaneBufferGeometryProps } from '@react-three/fiber'
import { LinearMipMapLinearFilter, NearestFilter, Texture, Vector2 } from 'three'

import { useTexture } from '../../hooks/useTexture'
import { useAnimateFrame } from './useAnimateFrame'

export type SpriteProps = MeshProps & {
  name: string
  action?: string
  textureData: TextureData

  geometryProps?: PlaneBufferGeometryProps
  materialProps?: Omit<MeshLambertMaterialProps, 'ref' | 'map' | 'attach'>
}

export type TextureData = {
  path: string
  frameSize: FrameSize
  actionData: TextureDataAction[]
}

export type TextureDataAction = {
  name: string // idle, walk, run
  frames: number[][] // [ [x1, y1], [x2, y2] ]
  frameRate?: number // in milliseconds
}

export const Sprite: React.FC<SpriteProps> = forwardRef(({
  name,
  action: actionName,
  textureData: {
    path,
    actionData,
    frameSize,
  },
  children,

  geometryProps,
  materialProps,
  ...meshProps
}, ref) => {
  const texture = useTexture({ name, src: path })
  useTextureConfig(texture, frameSize)

  const action = useMemo(() => {
    return actionData.find(x => x.name === actionName)
  }, [actionData, actionName])

  const renderFrame = useCallback((frame = 0) => {
    if(!texture) return
    if(!action) return

    const frameData = action.frames[frame]
    if(!frameData) return

    const offset = new Vector2(
      (frameData[0] * frameSize.width) / texture.image.width,
      (frameData[1] * frameSize.height) / texture.image.height
    )
    texture.offset = offset
  }, [texture, action, frameSize.width, frameSize.height])
  
  // render first frame
  useEffect(() => {
    renderFrame(0)
  }, [renderFrame, action])

  // animate between frames
  useAnimateFrame(renderFrame, action)

  return (
    <mesh {...meshProps} ref={ref}>
      <planeBufferGeometry {...geometryProps} />
      <meshLambertMaterial
        attach='material'
        transparent
        map={texture}
        {...materialProps}
      />
      {children}
    </mesh>
  )
})

type FrameSize = {
  width: number
  height: number
}
const useTextureConfig = (texture: Texture, frameSize: FrameSize) => {
  useEffect(() => {
    if(!texture) return
    const map = texture as Texture

    map.magFilter = NearestFilter
    map.minFilter = LinearMipMapLinearFilter
    map.repeat = new Vector2(
      1 / (map.image.width / frameSize.width),
      1 / (map.image.height / frameSize.height)
    )
  }, [texture, frameSize.width, frameSize.height])
}
