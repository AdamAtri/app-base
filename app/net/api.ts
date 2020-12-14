import * as http from "tns-core-modules/http";

export type Param = [string /*key*/, any /*value*/]

const host = "<localhost>:9191";
const baseUrl = `http://${host}`;
export async function get(url:string, params?:Array<Param>):Promise<any> {
  if (await ping() !== true) {
    return Promise.reject()
  }
  url = url.startsWith('http') ? url : 
        url.startsWith('/') ? baseUrl + url : null;
  if (! url) {
    return Promise.reject("malformed url: " + url);
  }
  if (params && params.length) {
    const query = params.map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
    url += `?${query.join('&')}`;
  }
  return await http.getJSON(url);
}

export function ping():Promise<boolean> {
  try{
    return http.getJSON(`${baseUrl}/ping`);
  } catch(e) {
    return Promise.resolve(false);
  }
}

(global as any).ping = ping;
(global as any).apiGet = get;