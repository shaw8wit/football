import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { api_key } from "../const";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
        return next.handle(
            httpRequest.clone({
                headers: new HttpHeaders({ "x-rapidapi-key": api_key })
            })
        );
    }
}