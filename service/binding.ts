import { del, get, patch, post, put } from './base'


export const getAllApps = (): Promise<any> => {
    return get(`/apps`)
}

export const operateApp = (type:any,department:any,app:any): Promise<any> => {
    let request:any

    if(type == 'add'){

        request = post(`/workspaces/current/departments/${department}/addapp/${app}`)

    }else if(type == 'look'){

        request = get(`/workspaces/current/departments/${department}/apps`)

    }else if(type == 'del'){

        request = del(`/workspaces/current/departments/${department}/deleteapp/${app}`)
        
    }

    return request
}

export const operateDepUser = (type:any,department:any,user:any): Promise<any> => {
    let request:any

    if(type == 'add'){

        request = post(`/workspaces/current/departments/${department}/addenduser/${user}`)

    }else if(type == 'look'){

        request = get(`/workspaces/current/endusers/${user}/departments`)

    }else if(type == 'del'){

        request = del(`/workspaces/current/departments/${department}/deleteenduser/${user}`)
        
    }

    return request

}

export const getUserDep = (user:any): Promise<any> => {
    return get(`/workspaces/current/endusers/${user}/departments`)
}

