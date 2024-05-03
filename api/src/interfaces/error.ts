export interface IMongooseError extends Error {
  code?: number;
}

export interface HttpError extends Error {
  status?: number;
}
