/**
 * A delegate function which, when called, calls the next piece of middleware
 * in the pipeline.
 */
export type RequestCursor = () => Promise<void>;