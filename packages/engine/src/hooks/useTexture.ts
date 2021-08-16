import { Texture, TextureLoader } from 'three'
import { useAsset } from 'use-asset'

export type useTextureOptions = {
  name: string
  src: string
}
export const useTexture = ({ name, src }: useTextureOptions) => {
  const [texture] = useAsset<Texture[], any>(loadingFunction<any>(), TextureLoader, name, src)
  return texture
}

type Extensions = (loader: THREE.Loader) => void
type LoaderResult<T> = T extends any[] ? Loader<T[number]> : Loader<T>
type Loader<T> = THREE.Loader & {
  load(
    url: string,
    onLoad?: (result: T) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ): unknown
}
function loadingFunction<T>(extensions?: Extensions, onProgress?: (event: ProgressEvent<EventTarget>) => void) {
  return function (Proto: new () => LoaderResult<T>, name: string, ...input: string[]) {
    const loader = new Proto()
    if (extensions) extensions(loader)

    return Promise.all<Texture>(
      input.map(
        (input) =>
          new Promise((res, reject) =>
            loader.load(
              input,
              (data: any) => res(data),
              onProgress,
              (error) => reject(`Could not load ${input}: ${error.message}`),
            ),
          ),
      ),
    )
  }
}
