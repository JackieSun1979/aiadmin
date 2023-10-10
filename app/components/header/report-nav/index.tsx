'use client'

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { flatten } from 'lodash-es'
import Nav from '../nav'
import { fetchDataDetail, fetchDatasets } from '@/service/datasets'
import { PuzzlePiece01 } from '@/app/components/base/icons/src/vender/line/development'
import type { DataSetListResponse } from '@/models/datasets'

const getKey = (pageIndex: number, previousPageData: DataSetListResponse) => {
  if (!pageIndex || previousPageData.has_more)
    return { url: 'datasets', params: { page: pageIndex + 1, limit: 30 } }
  return null
}

const DatasetNav = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { datasetId } = useParams()
  const { data: currentDataset } = useSWR(datasetId || null, fetchDataDetail)
  const { data: datasetsData, setSize } = useSWRInfinite(datasetId ? getKey : () => null, fetchDatasets, { revalidateFirstPage: true })
  const datasetItems = flatten(datasetsData?.map(datasetData => datasetData.data))
  const handleLoadmore = useCallback(() => {
    setSize(size => size + 1)
  }, [setSize])
  return (
    <Nav
      icon={<PuzzlePiece01 className='w-4 h-4' />}
      activeIcon={<PuzzlePiece01 className='w-4 h-4' />}
      text={t('common.menus.report')}
      activeSegment='report'
      link='/department/door'
      curNav={currentDataset}
      navs={datasetItems.map(dataset => ({
        id: dataset.id,
        name: dataset.name,
        link: `/department/${dataset.id}/documents`,
        icon: dataset.icon,
        icon_background: dataset.icon_background,
      }))}
      createText={t('common.menus.report')}
      onCreate={() => router.push('/department/create')}
      onLoadmore={handleLoadmore}
    />
  )
}

export default DatasetNav
