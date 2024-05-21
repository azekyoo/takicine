import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from './user.service';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    user: User;

    constructor(private userService: UserService) {
    }

    refreshUser(): Observable<User> {
        if (!this.user) {
            return of(null);
        }
        return this.userService.connectionUser(this.user.email)
            .pipe(tap(user => {
                this.user = user;
            }))
    }
}
