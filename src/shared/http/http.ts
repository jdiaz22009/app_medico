import { Injectable } from '@angular/core';
//import { HTTP } from '@ionic-native/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '@ionic-native/file';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { UtilityProvider } from '../../providers/utility/utility'

import { HttpRequestHandler, HttpRequestBase, MessageType, ErrorUtil } from '../../app/core/models/http-model';
import { Platform } from 'ionic-angular';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(
    private http: HttpClient,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform,
    private utilityProvider: UtilityProvider
  ) { }

  /**
   * performs a request with GET http method
   */
  public get(url: string, httpRequestHandler: HttpRequestHandler, token?: string) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler, token);
    this.handleResponse(this.http.get(url), httpRequestHandler);
  }

  /**
   * performs a request with POST http method
   */
  public post(url: string, data: any, httpRequestHandler: HttpRequestHandler) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.post(url, data, headers), httpRequestHandler);
  }

  /**
   * performs a request with DELETE http method
   */
  public delete(url: string, httpRequestHandler: HttpRequestHandler) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.delete(url, headers), httpRequestHandler);
  }

  /**
   * performs a request with PUT http method
   */
  public put(url: string, data: any, httpRequestHandler: HttpRequestHandler) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.put(url, {}, headers), httpRequestHandler);
  }

  public download(url: string, filename: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.externalRootDirectory + 'Download/' + filename;
    }

    return fileTransfer.download(url, path, false, {});
  }

  private setHandlerDefaults(httpRequestHandler: HttpRequestHandler) {
    if (httpRequestHandler.includeToken == null) httpRequestHandler.includeToken = true;
    if (httpRequestHandler.errorMsgType == null) httpRequestHandler.errorMsgType = MessageType.Toast;
  }

  /**
   * returns the headers for an specific request based on guest config
   */
  private getHeaders(httpRequestBase: HttpRequestBase, token?: string) {
    const headers = {};
    if (httpRequestBase.includeToken) headers['Authorization'] = token;
    return headers;
  }

  /**
   * handle the response for a given request
   */
  private handleResponse(request: Observable<any>, httpRequestHandler: HttpRequestHandler) {
    request
      .finally(() => {
        if (httpRequestHandler.always) httpRequestHandler.always();
      })
      .subscribe(
        res => {
          if (httpRequestHandler.success) {
            try {
              httpRequestHandler.success(res);
            } catch (e) {
              httpRequestHandler.success(res);
            }
          }
        },
        err => {
          const data = this.handleError(err, httpRequestHandler.errorMsgType);
          if (httpRequestHandler.error) {
            const util: ErrorUtil = {
              err: err,
              showToastError: this.generateError.bind(this, err, MessageType.Toast, data),
              showAlertError: this.generateError.bind(this, err, MessageType.Toast, data)
            };
            httpRequestHandler.error(data, util);
          }
        }
      );
  }

  /**
   * handle the error for the requests
   */
  private handleError(err: any, type: MessageType) {
    let data: any;
    if (err.headers && err.headers['content-type'] === 'application/json') {
      data = err.error !== '' ? JSON.parse(err.error) : [];
    }
    this.generateError(err, type, data);
    return data;
  }

  private generateError(err: any, type: MessageType, data: any) {
    if (type === MessageType.None) return;

    const basicError = () => {

      const errorMsg = err.message ? err.message : err.statusText ? err.statusText : 'Server error';

      if (type === MessageType.Toast) {
        this.utilityProvider.presentToast('Error al realizar la solicitud. Inténtalo de nuevo.');
      } else if (type === MessageType.Loading) {
        console.log('Loading');
      }
    };
    basicError();
  }

}
