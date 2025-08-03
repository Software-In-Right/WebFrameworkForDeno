/**
 * Used for creating the final Response object returned by the
 * server.
 *
 * @see Response
 */
export interface HttpResponse {
    /**
     * The optional body of the response.
     */
    body?: BodyInit | null;

    /**
     * Headers to return on the response.
     */
    headers: HeadersInit;

    /**
     * The response status.
     *
     * @remarks
     *
     * These are HTTP status codes, such as 200, 404, 500, etc.
     */
    status?: number;

    /**
     * Also called the 'reason phrase', this text is an optional message
     * appended to a response to describe the status.
     */
    statusText?: string;
}