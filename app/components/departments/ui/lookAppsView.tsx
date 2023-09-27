import React, { useEffect, FC } from 'react'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import { useTranslation } from 'react-i18next'
import { operateApp } from '@/service/binding'

type Props = {
  depId:any,
  onHide:any,
  lookApps:any
}
const demoView: FC<Props> = (Props) => {
    const { t } = useTranslation()
    const { notify } = useContext(ToastContext)
    const [lookApps, setLookApps] = React.useState(Props.lookApps)
    useEffect(() => {
    }, [])
    const bindAddHide = () =>{
      Props.onHide()
    }
    const secureApp = async (data:any) =>{
        let res = await operateApp('del',Props.depId,data.id)
        let list = JSON.parse(JSON.stringify(lookApps))
        lookApps.map((item:any,index:any)=>{
            if(item.id == data.id){
                list.splice(index,1)
            }
        })
        setLookApps(list)
        bindAddHide()
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }
    return (
        <div>
            <div onClick={bindAddHide} className='bg-black/75 w-screen h-screen fixed left-0 top-0 z-10'></div>
            <div className='bg-white text-[14px] w-9/12 rounded-lg max-w-4xl fixed left-0 top-0 z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                <div className='flex justify-between items-center h-[64px] px-4 border-b-[1px] text-[16px]'>
                    <div>
                        查看应用
                    </div>
                    <span onClick={bindAddHide} className='cursor-pointer p-2'>
                        <XClose className='w-4 h-4 text-gray-500' />
                    </span>
                </div>
                <div className='px-8 pb-8 max-h-[600px] overflow-auto'>
                    <div className="head flex text-center border-b h-[48px] items-center">
                        <div className="w-[240px]">ID</div>
                        <div className="flex-1">名称</div>
                        <div className="w-[80px]">操作</div>
                    </div>

                    {/* {apps} */}
                    {lookApps.map((item:any)=>{
                        return (
                            <div className="flex text-center border-b h-[48px] items-center hover:bg-gray-100" key={item.id}>
                                <div className="w-[240px]">{item.id}</div>
                                <div className="flex-1">{item.name}</div>
                                <div className="w-[80px]">
                                    <span onClick={()=>secureApp({id:item.id})} className='inline-flex px-4 justify-center items-center h-7 rounded-lg bg-red-600 hover:bg-red-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>
                                        解除关联
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    )
  }
export default demoView