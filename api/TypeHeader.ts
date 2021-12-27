interface HeadersType {
  'Content-Type'?: ContentType
  Accept?: string
}

export enum ContentType {
  // MULTIPART = 'multipart/form-data; boundary=boundary',
  MULTIPART = 'multipart/form-data',
  JSON = 'application/json',
}

export default HeadersType
