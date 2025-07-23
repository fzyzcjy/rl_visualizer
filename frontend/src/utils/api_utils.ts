type ApiResult<T, E> = { data: T; error: undefined } | { data: undefined; error: E };

export async function unwrapApiResult<T, E>(promise: Promise<ApiResult<T, E>>): Promise<T> {
  const result = await promise;
  if (result.error) {
    throw result.error;
  }
  return result.data;
}
