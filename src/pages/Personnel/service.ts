import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

//得到组织机构下的人员列表
export async function queryPersonnel(params: TableListParams) {
  const query = stringify(params);
  return request(`/api/Person?${query}`);
}

//得到全部组织机构
export async function queryOrganization() {
  return request('api/Organization');
}
