import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRemise, defaultValue } from 'app/shared/model/remise.model';

export const ACTION_TYPES = {
  SEARCH_REMISES: 'remise/SEARCH_REMISES',
  FETCH_REMISE_LIST: 'remise/FETCH_REMISE_LIST',
  FETCH_REMISE: 'remise/FETCH_REMISE',
  CREATE_REMISE: 'remise/CREATE_REMISE',
  UPDATE_REMISE: 'remise/UPDATE_REMISE',
  DELETE_REMISE: 'remise/DELETE_REMISE',
  RESET: 'remise/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRemise>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RemiseState = Readonly<typeof initialState>;

// Reducer

export default (state: RemiseState = initialState, action): RemiseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_REMISES):
    case REQUEST(ACTION_TYPES.FETCH_REMISE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REMISE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REMISE):
    case REQUEST(ACTION_TYPES.UPDATE_REMISE):
    case REQUEST(ACTION_TYPES.DELETE_REMISE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_REMISES):
    case FAILURE(ACTION_TYPES.FETCH_REMISE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REMISE):
    case FAILURE(ACTION_TYPES.CREATE_REMISE):
    case FAILURE(ACTION_TYPES.UPDATE_REMISE):
    case FAILURE(ACTION_TYPES.DELETE_REMISE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_REMISES):
    case SUCCESS(ACTION_TYPES.FETCH_REMISE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REMISE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REMISE):
    case SUCCESS(ACTION_TYPES.UPDATE_REMISE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REMISE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/remises';
const apiSearchUrl = 'api/_search/remises';

// Actions

export const getSearchEntities: ICrudSearchAction<IRemise> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_REMISES,
  payload: axios.get<IRemise>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IRemise> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REMISE_LIST,
  payload: axios.get<IRemise>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRemise> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REMISE,
    payload: axios.get<IRemise>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRemise> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REMISE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRemise> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REMISE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRemise> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REMISE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
