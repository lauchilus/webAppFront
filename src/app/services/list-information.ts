import { Router } from "@angular/router";
import { List } from "../models/list";
import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  
export class ListInformation {

    private list = new BehaviorSubject<any>(null);
    objetList$ = this.list.asObservable();
  
    ChangeObject(object: any) {
      this.list.next(object);
      console.log("CAMBIE OBJETO:" + object)
    }
}
