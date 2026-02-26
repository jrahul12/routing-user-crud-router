import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _loader: SnackBarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loader.loader$.next(true)
    return next.handle(request).pipe(
      finalize(() => {
        this._loader.loader$.next(false)
      })
    )
  }
}
