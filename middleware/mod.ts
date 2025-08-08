/**
 * This module provides a middleware pipeline for processing HTTP requests
 * for a deno server.
 * 
 * @example
 * ```ts
 * import type { Middleware, RequestCursor } from "@sir/wfd-middleware";
 * import type { HttpContext } from "@sir/wfd-types";
 * 
 * export const DurationMiddleware: Middleware = async (context: HttpContext, next: RequestCursor) => {
 *     const startTime = new Date();

 *     await next();

 *     const endTime = new Date();

 *     const duration = endTime.getTime() - startTime.getTime();

 *     const updatedHeaders: HeadersInit = {
 *         ...context.response.headers,
 *         'Request-Duration': duration.toString() + 'ms'
 *     }

 *     context.response.headers = updatedHeaders;
 * }
 * ```
 * 
 * @example
 * ```ts
 * import { addMiddleware, runMiddleware } from "@sir/wfd-middleware";
 * import { DurationMiddleware } from "./DurationMiddleware.ts";
 * 
 * addMiddleware(DurationMiddleware);
 * 
 * Deno.serve((request) => await runMiddleware(request));
 * ```
 * 
 * @module
 */

import type { HttpContext } from "@sir/wfd-types";
import type { Middleware } from "./Middleware.ts";
import type { RequestCursor } from "./RequestCursor.ts";

const middlewareFunctions: Middleware[] = [];

/**
 * Runs all the middleware in the pipeline.
 *
 * @param context The HttpContext to manage.
 * @param next The awaiter for pre and post middleware operations.
 */
async function executeMiddleware(context: HttpContext, next: RequestCursor) {
    // Creates an "initial" middleware method used to execute middleware functions
    // in the order in which they are registered, while using a "next" function
    // to allow for pre and post operations during the request pipeline.
    // My understanding is that building the middleware pipeline must start from
    // the last registered middleware function because the pipeline is being
    // built from the inside out, hence, if we used reduce() the functions would
    // be called last-in first-out instead of first-in last-out like we want.
    const run = middlewareFunctions.reduceRight(
        (previous, current) => async () => {
            return await current(
                context,
                async () => await previous(context, next)
            );
        },
        next
    );

    await run(context, next);
}

/**
 * Adds the next piece of middleware to the pipeline.
 *
 * @param middleware The next piece of middleware to add to the pipeline. Order
 *                   is FIFO.
 */
export function addMiddleware(middleware: Middleware): void {
    middlewareFunctions.push(middleware);
}

/**
 * Passes the request and response to middleware to be processed.
 *
 * @param request The HTTP request to process in the middleware pipeline.
 *
 * @returns A promise with a response.
 */
export async function runMiddleware(request: Request): Promise<Response> {
    const context: HttpContext = {
        request,
        response: {
            headers: {}
        }
    };

    const next = () => new Promise<void>(resolve => resolve());

    await executeMiddleware(context, next);

    const { response } = context;

    return new Response(response.body, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
    });
}

export type { Middleware, RequestCursor };