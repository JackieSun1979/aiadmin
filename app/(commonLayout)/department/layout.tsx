import type { FC , ReactElement } from 'react'
import React from 'react'
import LeftMenu from '@/app/components/departments/left-menu'

export type IAppDetail = any
const Apps:FC<IAppDetail> = ({ children }):ReactElement => {
  return (
    <div className='px-6 py-4 w-full min-h-full'>
      <div className="w-full min-h-full text-sm flex">
          <LeftMenu/>
          {children}
      </div>
    </div>
  )
}
export default React.memo(Apps)