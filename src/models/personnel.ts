import { history, Reducer, Effect } from 'umi';
import { queryPersonnel } from '@/services/personnel';

export interface PersonnelModelState {
  id: number;
  title: string;
  published_at: string;
  playlist_name: string;
  is_paid: boolean;
  weight: number;
  time: string;
}

export interface PersonnelModelType {
  namespace: 'personnel';
  state: PersonnelModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<PersonnelModelState>;
    // changeNotifyCount: Reducer<PersonnelModelState>;
  };
}

const PersonnelModel: PersonnelModelType = {
  namespace: 'personnel',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryPersonnel);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    }
  },
};

export default PersonnelModel;