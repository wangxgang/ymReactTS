import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addMovie, queryPersonnel, removeMovie } from './service';

import { PersonnelListData } from './data2.d';

export interface StateType {
  data: PersonnelListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    updateMovie: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'personnels',

  state: {
    data: {
      personnels: [],
      page: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPersonnel, payload);
      debugger
      yield put({
        type: 'save',
        payload: response.response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      try {
        yield call(addMovie, payload);
        yield put({
          type: 'fetch',
        });
        callback();
      } catch (e) {
        callback(e.data.message);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      try {
        yield call(removeMovie, payload);
        callback();
      } catch (e) {
        callback(e.data.message);
      }
    },
    *update({ payload, callback }, { call, put }) {
      try {
        const response = yield call(updateMovie, payload);
        // yield put({
        //   type: 'fetch',
        // });
        yield put({
          type: 'updateMovie',
          payload: response.response,
        });
        callback();
      } catch (e) {
        callback(e.data.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    updateMovie(state, action) {
      return {
        ...state,
        data: {
          ...state!.data,
          personnels: state!.data.personnels.map(personnel => {
            if (personnel.id === action.payload.movie.id) return action.payload.movie;
            return personnel;
          }),
        },
      };
    },
  },
};

export default Model;
