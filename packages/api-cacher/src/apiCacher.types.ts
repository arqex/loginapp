export interface LoaderResult<RET> {
  isLoading: boolean;
  data: RET | undefined;
  error: any;
}
