import { RequestCursor } from "./RequestCursor";

/**
 * Represents a middleware function for building a request/response pipeline.
 *
 * @param {HttpContext} context The current request/response to the server.
 * @param {Middleware} next The next middleware in the pipeline to call.
 *
 * @returns A void promise.
 */
export type Middleware = (context: HttpContext, next: RequestCursor) => Promise<void>;