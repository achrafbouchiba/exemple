import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICodePostaux, defaultValue } from 'app/shared/model/code-postaux.model';

export const ACTION_TYPES = {
  SEARCH_CODEPOSTAUXES: 'codePostaux/SEARCH_CODEPOSTAUXES',
  FETCH_CODEPOSTAUX_LIST: 'codePostaux/FETCH_CODEPOSTAUX_LIST',
  FETCH_CODEPOSTAUX: 'codePostaux/FETCH_CODEPOSTAUX',
  CREATE_CODEPOSTAUX: 'codePostaux/CREATE_CODEPOSTAUX',
  UPDATE_CODEPOSTAUX: 'codePostaux/UPDATE_CODEPOSTAUX',
  DELETE_CODEPOSTAUX: 'codePostaux/DELETE_CODEPOSTAUX',
  RESET: 'codePostaux/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICodePostaux>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CodePostauxState = Readonly<typeof initialState>;

// Reducer

export default (state: CodePostauxState = initialState, action): CodePostauxState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CODEPOSTAUXES):
    case REQUEST(ACTION_TYPES.FETCH_CODEPOSTAUX_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CODEPOSTAUX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CODEPOSTAUX):
    case REQUEST(ACTION_TYPES.UPDATE_CODEPOSTAUX):
    case REQUEST(ACTION_TYPES.DELETE_CODEPOSTAUX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CODEPOSTAUXES):
    case FAILURE(ACTION_TYPES.FETCH_CODEPOSTAUX_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CODEPOSTAUX):
    case FAILURE(ACTION_TYPES.CREATE_CODEPOSTAUX):
    case FAILURE(ACTION_TYPES.UPDATE_CODEPOSTAUX):
    case FAILURE(ACTION_TYPES.DELETE_CODEPOSTAUX):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CODEPOSTAUXES):
    case SUCCESS(ACTION_TYPES.FETCH_CODEPOSTAUX_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CODEPOSTAUX):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CODEPOSTAUX):
    case SUCCESS(ACTION_TYPES.UPDATE_CODEPOSTAUX):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CODEPOSTAUX):
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

const apiUrl = 'api/code-postauxes';
const apiSearchUrl = 'api/_search/code-postauxes';

// Actions

export const getSearchEntities: ICrudSearchAction<ICodePostaux> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CODEPOSTAUXES,
  payload: axios.get<ICodePostaux>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<ICodePostaux> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CODEPOSTAUX_LIST,
  payload: axios.get<ICodePostaux>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICodePostaux> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CODEPOSTAUX,
    payload: axios.get<ICodePostaux>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICodePostaux> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CODEPOSTAUX,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICodePostaux> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CODEPOSTAUX,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICodePostaux> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CODEPOSTAUX,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
