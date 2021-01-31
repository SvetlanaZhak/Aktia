import fetch, { RequestInit } from 'node-fetch';

export function fetchJson(url: string, method?: string, body?: any) {
  const options: RequestInit = { method: method || 'GET', headers: { 'Content-Type': 'application/json' } };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options);
}
