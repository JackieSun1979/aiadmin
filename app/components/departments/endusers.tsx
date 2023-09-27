"use client";
import React, { useEffect, useRef } from 'react'
import { getEndusers , addEndusers,getUserDetail,editEnduserst,DelEndusers} from '@/service/departments'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import { useTranslation } from 'react-i18next'


const Endusers = () => {
  const { t } = useTranslation()
  const { notify } = useContext(ToastContext)
    const [departments, setDepart]: any = React.useState([])

    let getData = async() =>{
        let res:any = await getEndusers()
        setDepart(res.endusers)
    }
    let fomrData = {
        name:'',
        loginname:''
    }
    const [addShow,setAddShow]: any = React.useState(false)
    const [inputForm, setInputForm] = React.useState(fomrData)
    const [getId, setGetId] = React.useState(null)
    
    useEffect(() => {
        getData()
    }, [])

    

    const bindAddHide = () =>{setAddShow(false);setGetId(null)}

    const formSubmit = async () =>{
        // 添加部门
        if(!inputForm.name||!inputForm.loginname){
            return
        }
        if(getId){
            let res = await editEnduserst(getId,inputForm)
        }else{
            let res = await addEndusers(inputForm)
        }
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
        getData()
        bindAddHide()
        setInputForm(fomrData)
    }
    const bindAddShow = () =>{
        
        // add
        setAddShow(true)
        setInputForm(fomrData)
    }
    const editChange = async (data:any) =>{
        // edit
        let res:any = await getUserDetail(data.id)
        let obj = {
            name:res.department.name,
            loginname:res.department.session_id
        }
        setInputForm(obj)
        setAddShow(true)
        setGetId(data.id)
    }
    const delChange = async (data:any) =>{
        let res:any = await DelEndusers(data.id)
        getData()
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }
    const addView = (
        <div>
            <div onClick={bindAddHide} className='bg-black/75 w-screen h-screen fixed left-0 top-0 z-10'></div>
            <div className='bg-white text-[14px] w-6/12 rounded-lg max-w-2xl fixed left-0 top-0 z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                <div className='flex items-center h-[64px] px-4 border-b-[1px] text-[16px]'>
                    {getId?'编辑用户':'添加用户'}
                </div>
                <div className='p-8'>
                    <div className='flex items-center h-[48px] mb-2'>
                        <div className='w-[80px] text-right'>name</div>
                        <div className='flex-1 ml-6'>
                            <input type="text" value={inputForm.name} maxLength={100} onChange={event=>setInputForm({...inputForm,['name']:event.target.value})} className='h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg grow w-full' />
                        </div>
                    </div>
                    <div className='flex items-center h-[48px]'>
                        <div className='w-[80px] text-right'>loginname</div>
                        <div className='flex-1 ml-6'>
                            <input type="text" value={inputForm.loginname} maxLength={100} onChange={event=>setInputForm({...inputForm,['code']:event.target.value})} className='h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg grow w-full' />
                        </div>
                    </div>
                    <div className='flex items-center h-[48px] mt-6'>
                        <div className='w-[80px] text-right'></div>
                        <div className='flex-1 ml-6'>
                            <span onClick={formSubmit} className='inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-8 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm undefined'>提交</span>
                            <span onClick={bindAddHide} className='ml-4 inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-8 py-2 text-base border-solid border border-gray-200 cursor-pointer text-gray-500 hover:bg-white hover:shadow-sm hover:border-gray-300 undefined'>取消</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )

    const tableView = (
        <div>
            <div className='pb-4 flex items-center justify-end'>
                <span onClick={bindAddShow} className='inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-4 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !h-8 !text-[13px]'>
                    添加用户
                </span>
            </div>
            <div className="head flex text-center border-b border-t h-[48px] items-center">
                <div className="w-[240px]">ID</div>
                <div className="flex-1">name</div>
                <div className="flex-1">loginname</div>
                <div className="flex-1">创建时间</div>
                <div className="w-[200px]">操作</div>
            </div>
            <div className="cont">
                {departments.map((item: any) => {
                    return (
                        <div className="flex text-center border-b min-h-[48px] items-center hover:bg-gray-100" key={item.id}>
                            <div className="w-[240px]">{item.id}</div>
                            <div className="flex-1">{item.name}</div>
                            <div className="flex-1">{item.session_id}</div>
                            <div className="flex-1">{item.created_at}</div>
                            <div className="w-[200px]">
                                <span onClick={()=>editChange({id:item.id})} className='inline-flex mr-4 px-4 justify-center items-center h-7 rounded-lg bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>编辑</span>
                                <span onClick={()=>delChange({id:item.id})} className='inline-flex px-4 justify-center items-center h-7 rounded-lg bg-red-600 hover:bg-red-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>删除</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
    return (
        <div className='flex-auto bg-white rounded-lg ml-4 p-4'>
            {tableView}
            {addShow? addView : ''}
        </div>
    );
};
export default Endusers