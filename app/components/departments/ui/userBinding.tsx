import React, { useEffect, FC } from 'react'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import { useTranslation } from 'react-i18next'
import { operateDepUser } from '@/service/binding'
import { getDepartment } from '@/service/departments'
import Loading from '@/app/components/base/loading'


type Props = {
  userId:any,
  onHide:any,
  fomrData:any,
}
const demoView: FC<Props> = (Props) => {
    const { t } = useTranslation()
    const { notify } = useContext(ToastContext)
    const [list,setList]: any = React.useState([])
    const [lookList,setLookList]: any = React.useState([])
    const [depId,setDepId]: any = React.useState(null)
    const [isLoading, setIsloading] = React.useState(true)

    let outTime:any
    const allDep = async () =>{
        let res = await getDepartment()
        setList(res.departments)
    }
    const lookDetail = async () =>{
        let res = await operateDepUser('look',{},Props.userId)
        setLookList(res.departments)
        setIsloading(false)
    }
    useEffect(() => {
        lookDetail()
        allDep()
    }, [])
    const bindAddHide = () =>{
      Props.onHide()
    }
    const onSubmit = async () =>{
        if(!depId) return
        clearTimeout(outTime)
        outTime = setTimeout(()=>{
            postSubmit()
        },500)
    }
    const postSubmit = async() =>{
        let res = await operateDepUser('add',depId,Props.userId)
        setDepId(null)
        lookDetail()
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }
    const delDep = async(data:any) =>{
        let res = await operateDepUser('del',data.id,Props.userId)
        lookDetail()
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }

    return (
        <div>
            <div onClick={bindAddHide} className='bg-black/75 w-screen h-screen fixed left-0 top-0 z-10'></div>
            <div className='bg-white overflow-y-auto max-h-[600px] text-[14px] w-6/12 rounded-lg max-w-2xl fixed left-0 top-0 z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                <div className='flex justify-between items-center h-[64px] px-4 border-b-[1px] text-[16px]'>
                    <div>
                        关联部门
                    </div>
                    <span onClick={bindAddHide} className='cursor-pointer p-2'>
                        <XClose className='w-4 h-4 text-gray-500' />
                    </span>
                </div>
                <div className='p-8'>
                    <div className='flex items-center h-[48px]'>
                        <div className='w-[80px] text-right'>选择部门</div>
                        <div className='flex-1 ml-6 flex'>
                            <select value={depId} onChange={event=>setDepId(event.target.value)}  className='flex-1 h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg grow'>
                                <option value=''>请选择</option>
                                {list.map((item:any)=>{
                                return(
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                ) 
                                })}
                            </select>

                            <span onClick={onSubmit} className='inline-flex ml-2 px-6 justify-center items-center h-10 rounded-lg bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>
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
                            <div className='w-[80px] text-right h-full'>所属部门</div>
                                {lookList.length > 0?(
                                    <div className='flex-1 ml-6'>
                                        {lookList.map((item:any)=>{
                                            return(
                                                <div className="flex justify-between border-b border-t h-[48px] items-center">
                                                    <div className="flex-1">{item.name}</div>
                                                    <div>
                                                        <span onClick={()=>delDep({id:item.id})} className='inline-flex px-4 justify-center items-center h-7 rounded-lg bg-red-600 hover:bg-red-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>
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
        </div>
    )
  }
export default demoView