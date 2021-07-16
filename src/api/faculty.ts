import { PaginationApiResult } from './apiResult';
import { ApiObject } from './conventions';
import { StumatchFetchInit, stumatchFetch } from './fetch';

export interface Faculty extends ApiObject {
  name: string;
  studyPrograms: Array<StudyProgram>;
}

export interface StudyProgram {
  _id?: string;
  id: string;
  name: string;
}

export function getAllFaculties(init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Faculty>>(`/api/v1/faculties`, init);
}
