import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, RouterLink} from '@angular/router';
import {defaultsDeep} from 'lodash';
import {FormsModule, NgForm} from '@angular/forms';
import {ConnectionService} from '../../services/connection.service';

@Component({
  selector: 'app-connection',
  standalone: true,
  templateUrl: './connection.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

    constructor(private userService: UserService, private router: Router, private connectionService: ConnectionService) {
    }

    userDoesntExist = false;

    ngOnInit(): void {
    }
    onSubmit(ngForm: NgForm) {
        const email = defaultsDeep({
            email: ngForm.form.value.email,
        });
        this.userService.connectionUser(email.email)
            .subscribe(user => {
                this.connectionService.user = user;
                this.router.navigateByUrl('/user-page');
            }, () => this.userDoesntExist = true);

    }
}
