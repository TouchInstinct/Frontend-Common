import * as R from 'ramda'

type Transformer = (value: any) => any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pipe = R.pipe as unknown as (...fs: Transformer[]) => (value: any) => any

export const thread = (value: any, ...fs: Transformer[]) => {
  const transform = pipe(...fs)

  return transform(value)
}
