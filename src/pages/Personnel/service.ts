import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function queryPersonnel(params: TableListParams) {
  const query = stringify(params);
  return request(`/api/Person?${query}`);
}

export async function removeMovie(params: TableListParams) {
  return request('/movies/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addMovie(params: TableListParams) {
  return request('/movies', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// export async function updateMovie(params: TableListParams) {
//   return request(`/movies/${params.personnel.id}`, {
//     method: 'PUT',
//     data: {
//       ...params,
//     },
//   });
// }
