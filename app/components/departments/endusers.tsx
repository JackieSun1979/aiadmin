"use client";
import React, { useEffect, useRef } from 'react'
import { getEndusers , addEndusers,getUserDetail,editEnduserst,DelEndusers} from '@/service/departments'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import { useTranslation } from 'react-i18next'
import Binddep from '@/app/components/departments/ui/userBinding'
import Adduser from '@/app/components/departments/ui/addUser'
import Loading from '@/app/components/base/loading'


const Endusers = () => {
  const { t } = useTranslation()
  const { notify } = useContext(ToastContext)
    const [departments, setDepart]: any = React.useState([])
    const [isLoading, setIsloading] = React.useState(true)

    let getData = async() =>{
        let res:any = await getEndusers()
        setDepart(res.endusers)
        setIsloading(false)
    }
    let fomrData = {
        name:'',
        loginname:''
    }
    const [addShow,setAddShow]: any = React.useState(false)
    const [inputForm, setInputForm] = React.useState(fomrData)

    const [bindDepShow, setBindDepShow] = React.useState(false)
    const [userId, setUserId] = React.useState(null)
    
    useEffect(() => {
        getData()
    }, [])

    

    const bindAddHide = () =>{
        setAddShow(false);
        setUserId(null)
        setBindDepShow(false)
    }

    const onReady = () =>{
        // 重置
        bindAddHide()
        setInputForm(fomrData)
        getData()
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
            name:res.enduser.name,
            loginname:res.enduser.session_id
        }
        setInputForm(obj)
        setAddShow(true)
        setUserId(data.id)
    }
    
    const delChange = async (data:any) =>{
        let res:any = await DelEndusers(data.id)
        getData()
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }

    const onUserDep = async (data:any) =>{
        setUserId(data.id)
        setBindDepShow(true)
    }

    const tableView = (
        <div>
            <div className='pb-4 flex items-center justify-between'>
                <div>
                    <input className='flex-grow rounded-lg h-9 box-border px-3 style_projectName__oF8xu bg-gray-100' type="text" />
                    <span className='ml-2 inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-4 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !h-8 !text-[13px]'>{t('common.operation.search')}</span>
                </div>
                <span onClick={bindAddShow} className='inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-4 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !h-8 !text-[13px]'>
                    添加用户
                </span>
            </div>
            <div className="head flex text-center border-b border-t h-[48px] items-center">
                <div className="w-[240px]">ID</div>
                <div className="flex-1">name</div>
                <div className="flex-1">loginname</div>
                <div className="flex-1">创建时间</div>
                <div className="w-[240px]">操作</div>
            </div>
            <div className="cont">
                {departments.map((item: any) => {
                    return (
                        <div className="flex text-center border-b min-h-[48px] items-center hover:bg-gray-100" key={item.id}>
                            <div className="w-[240px]">{item.id}</div>
                            <div className="flex-1">{item.name}</div>
                            <div className="flex-1">{item.session_id}</div>
                            <div className="flex-1">{item.created_at}</div>
                            <div className="w-[240px]">
                                <span onClick={()=>onUserDep({id:item.id})} className='inline-flex mr-4 px-4 justify-center items-center h-7 rounded-lg bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>
                                    关联部门
                                </span>
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
            {isLoading?(
                <div className='h-full flex items-center'>
                    <Loading type='area' />
                </div>
            ):tableView}
            {addShow? (
                <Adduser userId={userId} onHide={bindAddHide} fomrData={inputForm} onReady={onReady} />
            ) : ''}
            {bindDepShow?(
                <Binddep userId={userId} onHide={bindAddHide} fomrData={inputForm}/>
            ):''}
        </div>
    );
};
export default Endusers