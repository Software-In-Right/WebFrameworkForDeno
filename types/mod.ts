/**
 * The types module provides shared types used across the Web Framework for Deno.
 * 
 * @example
 * ```ts
 * import { HttpResponse } from "@sir/wfd-types";
 * 
 * const response: HttpResponse = {
 *     status: 200,
 *     statusText: "OK",
 *     headers: {
 *         "Content-Type": "application/json"
 *     },
 *     body: JSON.stringify({ message: "Hello, world!" })
 * };
 * ```
 * 
 * @module
 */

export * from "./HttpContext.ts";
export * from "./HttpRequest.ts";
export * from "./HttpResponse.ts";