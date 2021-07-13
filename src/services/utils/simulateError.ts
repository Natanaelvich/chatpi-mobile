/* eslint-disable prefer-promise-reject-errors */
export function simulateError(): Promise<void> {
  return Promise.reject({
    message: 'internal server error',
    response: { status: 500 },
    status: 500,
  });
}
