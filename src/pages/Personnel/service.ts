import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function queryPersonnel(params: TableListParams) {
  const query = stringify(params);
  return request(`/api/Person?${query}`);
}
