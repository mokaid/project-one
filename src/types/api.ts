export type ServerResponse<T> = {
  /**
   * 0 - Succeed,
   * 1 - Error
   */
  error: 0 | 1;
} & T;
