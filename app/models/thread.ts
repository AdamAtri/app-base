import * as trace from "tns-core-modules/trace/trace";
import {get, Param} from "~/net/api";

export type Thread = {
  "id": number,
  "identityId": number,
  "authorName": string,
  "authorAvatarUrl": string,
  "title": string,
  "description": string,
  "tags": string,
  "creation": number,
  "imageURL": string,
  "squareURL": string,
  "shareURL": string,
  "autoplay": boolean,
  "archived": boolean
}

const apiEndpoint = '/thread';

export async function getThreads(params?:Array<Param>):Promise<Array<Thread>> {
  try {
    return await get(`${apiEndpoint}/getList`, params);
  } catch(e) {
    trace.error('GET_THREADS: '+e);
    return null;
  }
}