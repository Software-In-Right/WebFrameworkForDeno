import { HttpRequest } from "./HttpRequest.ts";
import { HttpResponse } from "./HttpResponse.ts";

/**
 * The current context used to manage an HTTP request/response from the server.
 */
export interface HttpContext {
    /**
     * The parameters extracted from the request URL path.
     * 
     * @template Params The type of the parameters extracted from the request
     *                  URL path.
     * 
     * @returns The parameters extracted from the URL path as an object.
     */
    getParams: <Params = any>() => Params;

    /**
     * State used to share data during the request lifecycle.
     * 
     * @template State The type of the state object used to share data during
     *                 the request lifecycle.
     * 
     * @returns The state data.
     */
    getState: <State = any>() => State;

    /**
     * The HTTP request.
     *
     * @see {@link HttpRequest}
     */
    request: HttpRequest;

    /**
     * The HTTP response.
     *
     * @see {@link HttpResponse}
     */
    response: HttpResponse;
}