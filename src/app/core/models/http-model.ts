export interface HttpRequestBase {
  /**
   * default = true | whether to include the current token to the request headers
   */
  includeToken?: boolean;
}

export interface HttpRequestHandler extends HttpRequestBase {
  /**
   * callback called when request was successfully excuted
   */
  success?: (res: any) => void;
  /**
   * callback called when request had an error response
   */
  error?: (res: any, util: ErrorUtil) => void;
  /**
   * callback called when request has finished
   */
  always?: () => void;
  /**
   * default = ErrorMessageType.Notify | how to show default error when error response occurs
   */
  errorMsgType?: MessageType;
}

export interface HttpRequestObservable extends HttpRequestBase {
  /**
   * function to execute where map funtion is call
   */
  mapFn: (res: any) => any;
}

export interface HttpRequestPromise extends HttpRequestBase {
  /**
   * key used for returning the value from de response
   */
  mapKey?: string;
  /**
   * index used for returning the value from the response (only when de response mapKey is an array)
   */
  index?: number;
  /**
   * callback called when request had an error response
   */
  error?: (err: any) => void;
  /**
   * default = ErrorMessageType.Notify | how to show default error when error response occurs
   */
  errorMsgType?: MessageType;
}

export interface ErrorUtil {
  /**
   * error object given by native angular http service
   */
  err: any;

  /**
   * Show default error [NotifyMessageService]
   */
  showToastError();

  /**
   * Show default error [SwalMessageService]
   */
  showAlertError();
}

export enum MessageType {
  None = 1,
  Toast = 2,
  Loading = 3
}
