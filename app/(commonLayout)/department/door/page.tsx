import type { FC } from 'react'
import React from 'react'
import Depart from '@/app/components/departments/departments'
import { del, get, patch, post, put } from '@/service/base'

const Apps: FC = () => {
  get('workspaces/current/departments',{})
  return <Depart/>
}
export default React.memo(Apps)