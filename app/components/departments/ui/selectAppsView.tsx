import React, { useEffect, FC } from 'react'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import { useTranslation } from 'react-i18next'
import { getAllApps , operateApp } from '@/service/binding'

type Props = {
  depId:any,
  onHide:any
}
const demoView: FC<Props> = (Props) => {
    const { t } = useTranslation()
    const { notify } = useContext(ToastContext)
    const [apps,setApps]: any = React.useState([])
    const [appId,setAppId]: any = React.useState(null)
    const allApps = async () =>{
        let res = await getAllApps()
        setApps(res.data)
    }
    useEffect(() => {
        allApps()
    }, [])
    const bindAddHide = () =>{
      Props.onHide()
    }
    const onSelectSubmit = async () =>{
        if(!appId) return
        let res = await operateApp('add',Props.depId,appId)
        bindAddHide()
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }
    return (
        <div>
            <div onClick={bindAddHide} className='bg-black/75 w-screen h-screen fixed left-0 top-0 z-10'></div>
            <div className='bg-white text-[14px] w-6/12 rounded-lg max-w-2xl fixed left-0 top-0 z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                <div className='flex justify-between items-center h-[64px] px-4 border-b-[1px] text-[16px]'>
                    <div>
                        关联应用
                    </div>
                    <span onClick={bindAddHide} className='cursor-pointer p-2'>
                        <XClose className='w-4 h-4 text-gray-500' />
                    </span>
                </div>
                <div className='p-8'>
                    <div className='flex items-center h-[48px]'>
                        <div className='w-[80px] text-right'>选择应用</div>
                        <div className='flex-1 ml-6'>
                            <select onChange={event=>setAppId(event.target.value)}  className='h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg grow w-full'>
                                <option value=''>请选择</option>
                                {apps.map((item:any)=>{
                                return(
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                ) 
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center h-[48px] mt-6'>
                        <div className='w-[80px] text-right'></div>
                        <div className='flex-1 ml-6'>
                            <span onClick={onSelectSubmit} className='inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-8 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm undefined'>提交</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
export default demoView