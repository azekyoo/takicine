import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router, RouterLink} from '@angular/router';
import {ExportCsvService} from '../../services/exportCsv.service';
import {NgForOf} from "@angular/common";


@Component({
  standalone: true,
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

    users: User[];

    constructor(private userService: UserService, private router: Router, private exportCsvService: ExportCsvService) {
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => this.users = users);
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id).subscribe(succes => {
            this.users = this.users.filter(user => user.id !== id)
        });
    }

    downloadFile() {
        this.exportCsvService.downloadFile(this.users)
    }

}
