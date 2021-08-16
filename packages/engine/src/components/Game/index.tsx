import { CssBaseline } from '@material-ui/core'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { RecoilRoot } from 'recoil'

export const Game: React.FC<CanvasProps> = ({
  children,
  style = {
    width: '100vw',
    height: '100vh'
  },
  camera = {
    position: [0, 0, 32],
    zoom: 64,
    near: 0.1,
    far: 64,
  },
  orthographic = true,
  gl = { antialias: false },
  ...props
}) => {
  return (
    <>
      <CssBaseline />
      <Canvas
        style={style}
        camera={camera}
        orthographic={orthographic}
        gl={gl}
        {...props}
      >
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </Canvas>
    </>
  )
}
