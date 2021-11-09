export type ResultError = {
  status: number;
  message: string;
};

export type PostResult<R> = R | ResultError;

export function getJson<T>(url: RequestInfo): Promise<T> {
  return fetch(url).then((r) => r.json()) as Promise<T>;
}

export async function postJson<T, R>(
  url: RequestInfo,
  data: T
): Promise<PostResult<R>> {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.ok) {
    return result.json() as Promise<R>;
  }

  const message = await result.json();
  return <ResultError>{ status: result.status, ...message };
}
