import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class UserStatusService {
    private userStatus :Subject<string> = new Subject<string>()

    setUser(value: string){
        this.userStatus.next(value)
    }

    getUser(){
        return this.userStatus.asObservable()
    }
}