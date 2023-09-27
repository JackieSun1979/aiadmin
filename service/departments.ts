import { del, get, patch, post, put } from './base'

// 部门
export const getDepartment = (): Promise<any> => {
  return get(`/workspaces/current/departments`)
}
export const getDepartDetail = (id:any): Promise<any> => {
  return get(`/workspaces/current/departments/${id}`)
}

export const addDepartment = (body:any): Promise<any> => {
  return post(`/workspaces/current/departments`,{body})
}

export const editDepartment = (id:any,body:any): Promise<any> => {
  return put(`/workspaces/current/departments/${id}`,{body})
}

export const DelDepartment = (id:any): Promise<any> => {
  return del(`/workspaces/current/departments/${id}`)
}


// 用户
export const getEndusers = (): Promise<any> => {
  return get(`/workspaces/current/endusers`)
}
export const getUserDetail = (id:any): Promise<any> => {
  return get(`/workspaces/current/endusers/${id}`)
}
export const addEndusers = (body:any): Promise<any> => {
  return post(`/workspaces/current/endusers`,{body})
}

export const editEnduserst = (id:any,body:any): Promise<any> => {
  return put(`/workspaces/current/endusers/${id}`,{body})
}

export const DelEndusers = (id:any): Promise<any> => {
  return del(`/workspaces/current/endusers/${id}`)
}
// return post(url, { body })