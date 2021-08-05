import * as R from 'ramda'

type Transformer = (value: any) => any

const pipe = R.pipe as unknown as (...fs: Transformer[]) => (value: any) => any

export const thread = (value: any, fs: Transformer[]) => {
  const transform = pipe(...fs)

  return transform(value)
}
