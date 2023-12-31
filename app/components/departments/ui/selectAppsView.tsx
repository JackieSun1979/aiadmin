import React, { useEffect, FC } from 'react'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import { useTranslation } from 'react-i18next'
import { getAllApps , operateApp } from '@/service/binding'
import Loading from '@/app/components/base/loading'


type Props = {
  depId:any,
  onHide:any
}
const demoView: FC<Props> = (Props) => {
    const { t } = useTranslation()
    const { notify } = useContext(ToastContext)
    const [apps,setApps]: any = React.useState([])
    const [appId,setAppId]: any = React.useState(null)
    const [lookAppS, setLookAppS] = React.useState([])
    const [isLoading, setIsloading] = React.useState(true)

    const allApps = async () =>{
        let res = await getAllApps()
        setApps(res.data)
    }

    const lookApp = async () =>{
        let res = await operateApp('look',Props.depId,'')
        setLookAppS(res.apps)
        setIsloading(false)
    }
    
    useEffect(() => {
        lookApp()
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

    const delSecureApp = async (data:any) =>{
        let res = await operateApp('del',Props.depId,data.id)
        let list = JSON.parse(JSON.stringify(lookAppS))
        lookAppS.map((item:any,index:any)=>{
            if(item.id == data.id){
                list.splice(index,1)
            }
        })
        setLookAppS(list)
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }

    const boxView = (
        <div>
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
                        <div className='flex-1 ml-6 flex'>
                            <select onChange={event=>setAppId(event.target.value)}  className='flex-1 h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg grow'>
                                <option value=''>请选择</option>
                                {apps.map((item:any)=>{
                                return(
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                ) 
                                })}
                            </select>
                            <span onClick={onSelectSubmit} className='inline-flex ml-2 px-6 justify-center items-center h-10 rounded-lg bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>
                                添加
                            </span>
                        </div>
                    </div>

                    {isLoading?(
                        <div className='py-10'>
                            <Loading type='area' />
                        </div>
                    ):(
                            <div className='flex items-center min-h-[48px] mt-[20px]'>
                                <div className='w-[80px] text-right h-full'>己关联应用</div>
                                {lookAppS.length > 0?(
                                    <div className='flex-1 ml-6'>
                                        {lookAppS.map((item:any)=>{
                                            return(
                                                <div className="flex justify-between border-b border-t h-[48px] items-center">
                                                    <div className="flex-1">{item.name}</div>
                                                    <div>
                                                        <span onClick={()=>delSecureApp({id:item.id})} className='inline-flex px-4 justify-center items-center h-7 rounded-lg bg-red-600 hover:bg-red-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>
                                                            解除
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ):(
                                    <div className='flex-1 ml-6'>
                                        暂无
                                    </div>
                                )}
                            </div>
                        
                    )}
                </div>
        </div>
    )

    return (
        <div>
            <div onClick={bindAddHide} className='bg-black/75 w-screen h-screen fixed left-0 top-0 z-10'></div>
            <div className='bg-white overflow-y-auto max-h-[600px] text-[14px] w-6/12 rounded-lg max-w-2xl fixed left-0 top-0 z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                {boxView}
                
            </div>
        </div>
    )
  }
export default demoView