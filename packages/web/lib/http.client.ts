export type ResultError = {
  status: number;
  message: string;
};

export type Result<R> = R | ResultError;

export async function getJson<R>(url: RequestInfo): Promise<Result<R>> {
  const result = await fetch(url);

  return buildResult<R>(result);
}

export async function postJson<T, R>(
  url: RequestInfo,
  data: T
): Promise<Result<R>> {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return buildResult<R>(result);
}

const buildResult = async <R>(result: Response): Promise<Result<R>> => {
  if (result.ok) {
    return (await result.json()) as Promise<R>;
  }

  const message = await result.json();
  return <ResultError>{ status: result.status, ...message };
};
