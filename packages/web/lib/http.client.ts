export type ResultError = {
  status: number;
  message: string;
};

export type StreamResult = {
  contentType: string;
  body: ReadableStream<Uint8Array> | null;
};
export type Result<R> = R | ResultError;

export async function getJson<R>(url: RequestInfo): Promise<Result<R>> {
  const result = await fetch(url);

  return buildJsonResult<R>(result);
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
  return buildJsonResult<R>(result);
}

export async function getStream(
  url: RequestInfo
): Promise<Result<StreamResult>> {
  const result = await fetch(url);

  if (result.ok) {
    return {
      contentType:
        result.headers.get("Content-Type") ?? "application/octet-stream",
      body: result.body,
    };
  }

  return <ResultError>{ status: result.status, message: await result.text() };
}

export async function putFile<R>(
  url: RequestInfo,
  file: File
): Promise<Result<R>> {
  const formData = new FormData();

  formData.append("avatar", file);

  const result = await fetch(url, {
    method: "PUT",
    body: formData,
  });
  return buildJsonResult<R>(result);
}

export async function putForm<R>(
  url: RequestInfo,
  form: BodyInit
): Promise<Result<R>> {
  const result = await fetch(url, {
    method: "PUT",
    body: form,
  });
  return buildJsonResult<R>(result);
}

const buildJsonResult = async <R>(result: Response): Promise<Result<R>> => {
  if (result.ok) {
    return (await result.json()) as Promise<R>;
  }

  const message = await result.json();
  return <ResultError>{ status: result.status, ...message };
};
