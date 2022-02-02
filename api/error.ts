export class ApiError extends Error {
  errorCode: number
  errorMessage: Nullable<string>

  constructor(error: any) {
    super(error.message)

    this.errorCode = error?.response?.data?.errorCode ?? -1
    this.errorMessage = error?.response?.data?.errorMessage
  }
}
