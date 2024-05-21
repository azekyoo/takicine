import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {defaultsDeep} from 'lodash';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {User} from '../../models/user.model';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add-user.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    id: string;
    onAddPage: boolean;
    user: User;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')
        this.onAddPage = !this.id
        if (this.onAddPage) {
            this.user = new User()
        } else {
            this.userService.getUserById(parseInt(this.id, 10)).subscribe(u => {
                this.user = u
                console.log(this.user)
            })
        }
    }

    onSubmit(ngForm: NgForm) {
        if (this.onAddPage) {
            const user = defaultsDeep({
                id: null,
                firstName: ngForm.form.value.firstName,
                lastName: ngForm.form.value.lastName,
                email: ngForm.form.value.email,
                age: ngForm.form.value.age,
                points: 0,
            });
            this.userService.addUser(user).subscribe(u => console.log(u));
            setTimeout(() => {
                this.router.navigateByUrl('/')
            }, 1000);

        } else {
            const user = defaultsDeep({
                id: this.user.id,
                firstName: ngForm.form.value.firstName,
                lastName: ngForm.form.value.lastName,
                email: ngForm.form.value.email,
                age: ngForm.form.value.age,
                points: 0,
            });
            this.userService.updateUser(user).subscribe(u => console.log(u));
            setTimeout(() => {
                this.router.navigateByUrl('/user-page')
            }, 1000);
        }
    }
}
