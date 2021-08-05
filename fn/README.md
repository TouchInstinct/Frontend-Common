## fn

This module contains various ramda combinations/extensions.

### Available functions:

- `thread` - sequentially applies transforms from the array to the first argument.
  
    **Example usage**:
    ```typescript
    import * as R from 'ramda'
    import * as F from 'lib/fn'

    const a = F.thread(5, [
      R.add(3),
      R.multiply(2),
      R.dec,
    ])

    a === 15 // true

    // equivalent to:
    const transform = R.pipe(
      R.add(3),
      R.multiply(2),
      R.dec,
    )

    const b = transform(5)

    // or
    const c = R.pipe(
      R.add(3),
      R.multiply(2),
      R.dec,
    )(5)
    ```
