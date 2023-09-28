import React, { useState, FC, useMemo } from 'react'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import { useTranslation } from 'react-i18next'
import { addDepartment,editDepartment } from '@/service/departments'

type Props = {
  depId:any,
  onHide:any,
  fomrData:any,
  onReady:any
}
const demoView: FC<Props> = (Props) => {
    const { t } = useTranslation()
    const { notify } = useContext(ToastContext)
    const [inputForm, setInputForm] = React.useState(Props.fomrData)
    const bindAddHide = () =>{
      Props.onHide()
    }
    const formSubmit = async () =>{
      // 添加部门
        if(!inputForm.name||!inputForm.code){
            return
        }
        if(Props.depId){
            let res = await editDepartment(Props.depId,inputForm)
        }else{
            let res = await addDepartment(inputForm)
        }
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
        Props.onReady()
    }

    return (
      <div>
        <div onClick={bindAddHide} className='bg-black/75 w-screen h-screen fixed left-0 top-0 z-10'></div>
          <div className='bg-white text-[14px] w-6/12 rounded-lg max-w-2xl fixed left-0 top-0 z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
              <div className='flex justify-between items-center h-[64px] px-4 border-b-[1px] text-[16px]'>
                  <div>
                      {Props.depId?'编辑部门':'添加部门'}
                  </div>
                  <span onClick={bindAddHide} className='cursor-pointer p-2'>
                      <XClose className='w-4 h-4 text-gray-500' />
                  </span>
              </div>
              <div className='p-8'>
                  <div className='flex items-center h-[48px] mb-2'>
                      <div className='w-[80px] text-right'>名称</div>
                      <div className='flex-1 ml-6'>
                          <input type="text" value={inputForm.name} maxLength={100} onChange={event=>setInputForm({...inputForm,['name']:event.target.value})} className='h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg grow w-full' />
                      </div>
                  </div>
                  <div className='flex items-center h-[48px]'>
                      <div className='w-[80px] text-right'>简称</div>
                      <div className='flex-1 ml-6'>
                          <input type="text" value={inputForm.code} maxLength={100} onChange={event=>setInputForm({...inputForm,['code']:event.target.value})} className='h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg grow w-full' />
                      </div>
                  </div>
                  <div className='flex items-center h-[48px] mt-6'>
                      <div className='w-[80px] text-right'></div>
                      <div className='flex-1 ml-6'>
                          <span onClick={formSubmit} className='inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-8 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm undefined'>提交</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
export default demoView