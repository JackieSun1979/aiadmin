"use client";
import React, { useEffect, useRef } from 'react'
import { getDepartment ,getDepartDetail,DelDepartment} from '@/service/departments'
import {  operateApp } from '@/service/binding'
import { useContext } from 'use-context-selector'
import { ToastContext } from '@/app/components/base/toast'
import Addview from '@/app/components/departments/ui/addView'
import Selectview from '@/app/components/departments/ui/selectAppsView'
import { useTranslation } from 'react-i18next'
import Loading from '@/app/components/base/loading'


const Depart = () => {
    const { t } = useTranslation()
    const { notify } = useContext(ToastContext)
    const [departments, setDepart]: any = React.useState([])
    const [isLoading, setIsloading] = React.useState(true)

    let getData = async() =>{
        let res:any = await getDepartment()
        setDepart(res.departments)
        setIsloading(false)
    }
    let fomrData = {
        name:'',
        code:''
    }
    const [addShow,setAddShow]: any = React.useState(false)
    const [inputForm, setInputForm] = React.useState(fomrData)
    const [depId, setDepId] = React.useState(null)

    const [selectShow,setSelectShow]: any = React.useState(false)
    
    useEffect(() => {
        getData()
    }, [])
    const bindAddHide = () =>{
        // 关闭弹框
        setAddShow(false);
        setDepId(null)
        setSelectShow(false)
    }
    const onReady = async () =>{
        // 重置
        bindAddHide()
        setInputForm(fomrData)
        getData()
    }

    const addViewShow = () =>{
        // add
        setAddShow(true)
        setInputForm(fomrData)
    }
    
    const editChange = async (data:any) =>{
        // edit
        let res:any = await getDepartDetail(data.id)
        let obj = {
            name:res.department.name,
            code:res.department.code
        }
        setInputForm(obj)
        setAddShow(true)
        setDepId(data.id)
    }

    const delChange = async (data:any) =>{
        // del
        let res:any = await DelDepartment(data.id)
        getData()
        notify({ type: 'success', message: t('common.api.success'), duration: 3000 })
    }
    
    const onShowSelect = (data:any) =>{
        // showSelect
        setDepId(data.id)
        setSelectShow(true)
    }

    const tableView = (
        <div>
            <div className='pb-4 flex items-center justify-between'>
                <div>
                    <input className='flex-grow rounded-lg h-9 box-border px-3 style_projectName__oF8xu bg-gray-100' type="text" />
                    <span className='ml-2 inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-4 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !h-8 !text-[13px]'>{t('common.operation.search')}</span>
                </div>
                <span onClick={addViewShow} className='inline-flex justify-center items-center content-center h-9 leading-5 rounded-lg px-4 py-2 text-base bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !h-8 !text-[13px]'>添加部门</span>
            </div>
            <div className="head flex text-center border-b border-t h-[48px] items-center">
                <div className="w-[240px]">ID</div>
                <div className="flex-1">名称</div>
                <div className="flex-1">code</div>
                <div className="flex-1">创建时间</div>
                <div className="w-[300px]">操作</div>
            </div>
            <div className="cont">
                {departments.map((item: any) => {
                    return (
                        <div className="flex text-center border-b h-[48px] items-center hover:bg-gray-100" key={item.id}>
                            <div className="w-[240px]">{item.id}</div>
                            <div className="flex-1">{item.name}</div>
                            <div className="flex-1">{item.code}</div>
                            <div className="flex-1">{item.created_at}</div>
                            <div className="w-[300px]">
                                <span onClick={()=>onShowSelect({id:item.id})} className='inline-flex mr-2 px-4 justify-center items-center h-7 rounded-lg bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>
                                    关联应用
                                </span>
                                <span onClick={()=>editChange({id:item.id})} className='inline-flex mr-2 px-4 justify-center items-center h-7 rounded-lg bg-primary-600 hover:bg-primary-600/75 hover:shadow-md cursor-pointer text-white hover:shadow-sm !text-[12px]'>编辑</span>
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
                <Addview depId={depId} onHide={bindAddHide} fomrData={inputForm} onReady={onReady}/>
            ) : ''}
            {selectShow?(
                <Selectview depId={depId} onHide={bindAddHide} />
            ):''}
        </div>
    );
};
export default Depart