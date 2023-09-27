"use client";
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { usePathname } from 'next/navigation'

const LeftMenu = () => {
    const router:any = usePathname()
    return (
        <div className='w-[200px]'>
            <Link
                href='/department/door'
                className={cn(router=='/department/door' ? 'text-primary-600  bg-white font-semibold' : 'text-gray-700 font-medium', 'flex items-center h-9 pl-3 space-x-2 rounded-lg hover:bg-white mb-2')}
                style={router=='/department/door' ? { boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)' } : {}}
                >
                <div className='text-sm'>部门</div>
            </Link>
            <Link
                href='/department/user'
                className={cn(router=='/department/user'? 'text-primary-600  bg-white font-semibold' : 'text-gray-700 font-medium', 'flex items-center h-9 pl-3 space-x-2 rounded-lg hover:bg-white mb-2')}
                style={router=='/department/user' ? { boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)' } : {}}
                >
                <div className='text-sm'>用户</div>
            </Link>
            <div>
            </div>
        </div>
    );
};
export default LeftMenu