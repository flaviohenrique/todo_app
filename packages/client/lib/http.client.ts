export function getJson(url: RequestInfo) {
  return fetch(url).then(r => r.json());
}

export function postJson<T, R>(url: RequestInfo, data: T): Promise<R> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  }).then(r => r.json()) as Promise<R>;;
}
