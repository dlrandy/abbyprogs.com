import * as React from 'react'
import tw from 'twin.macro'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'

import {Link} from '@app/components/lib/index'

function NotFoundScreen(): EmotionJSX.Element {
  return (
    <div css={[tw`h-full grid items-center justify-center`]}>
      <div>
        Sorry... nothing here. <Link to="/discover">Go home</Link>
      </div>
    </div>
  )
}

export {NotFoundScreen}
