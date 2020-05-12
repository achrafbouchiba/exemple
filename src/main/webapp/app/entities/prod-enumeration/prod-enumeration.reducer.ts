import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProdEnumeration, defaultValue } from 'app/shared/model/prod-enumeration.model';

export const ACTION_TYPES = {
  SEARCH_PRODENUMERATIONS: 'prodEnumeration/SEARCH_PRODENUMERATIONS',
  FETCH_PRODENUMERATION_LIST: 'prodEnumeration/FETCH_PRODENUMERATION_LIST',
  FETCH_PRODENUMERATION: 'prodEnumeration/FETCH_PRODENUMERATION',
  CREATE_PRODENUMERATION: 'prodEnumeration/CREATE_PRODENUMERATION',
  UPDATE_PRODENUMERATION: 'prodEnumeration/UPDATE_PRODENUMERATION',
  DELETE_PRODENUMERATION: 'prodEnumeration/DELETE_PRODENUMERATION',
  RESET: 'prodEnumeration/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProdEnumeration>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProdEnumerationState = Readonly<typeof initialState>;

// Reducer

export default (state: ProdEnumerationState = initialState, action): ProdEnumerationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PRODENUMERATIONS):
    case REQUEST(ACTION_TYPES.FETCH_PRODENUMERATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODENUMERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODENUMERATION):
    case REQUEST(ACTION_TYPES.UPDATE_PRODENUMERATION):
    case REQUEST(ACTION_TYPES.DELETE_PRODENUMERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PRODENUMERATIONS):
    case FAILURE(ACTION_TYPES.FETCH_PRODENUMERATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODENUMERATION):
    case FAILURE(ACTION_TYPES.CREATE_PRODENUMERATION):
    case FAILURE(ACTION_TYPES.UPDATE_PRODENUMERATION):
    case FAILURE(ACTION_TYPES.DELETE_PRODENUMERATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PRODENUMERATIONS):
    case SUCCESS(ACTION_TYPES.FETCH_PRODENUMERATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODENUMERATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODENUMERATION):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODENUMERATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODENUMERATION):
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

const apiUrl = 'api/prod-enumerations';
const apiSearchUrl = 'api/_search/prod-enumerations';

// Actions

export const getSearchEntities: ICrudSearchAction<IProdEnumeration> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PRODENUMERATIONS,
  payload: axios.get<IProdEnumeration>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IProdEnumeration> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODENUMERATION_LIST,
  payload: axios.get<IProdEnumeration>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProdEnumeration> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODENUMERATION,
    payload: axios.get<IProdEnumeration>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProdEnumeration> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODENUMERATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProdEnumeration> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODENUMERATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProdEnumeration> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODENUMERATION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
