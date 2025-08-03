import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";

/**
 * The current context used to manage an HTTP request/response from the server.
 */
export interface HttpContext {
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