import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UserParams } from "../test/user-params";

@Injectable()
export class UserStatusService {
    private userStatus :Subject<UserParams> = new Subject<UserParams>()

    setUser(value: UserParams){
        this.userStatus.next(value)
    }

    getUser(){
        return this.userStatus.asObservable()
    }
}