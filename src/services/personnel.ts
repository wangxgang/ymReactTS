import request from '@/utils/request';
import { stringify } from 'qs';

export interface PersonnelParamsType {
  personName: string,
  gender: number,
  orgIndexCodes: string,
  pageNo: number,
  pageSize: number,
  isSubOrg: boolean
}

export async function queryPersonnel(params: PersonnelParamsType) {
  let query = stringify(params);
  return request(`/api/Person?${query}`);
}