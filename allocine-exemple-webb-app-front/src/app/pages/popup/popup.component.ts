import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    standalone: true,
    selector: 'app-popup',
    styleUrls: ['./popup.component.css'],
    template: `
        <div class="modal-header">
            <h4 class="modal-title" id="modal-basic-title">Bravo {{name}} !</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <img src="/assets/10off.png" class="center-block" height="80px"/>
            <p>Tu as donné plus de 2 avis ! Pour récompenser ta fidélité tu gagnes une réduction de -10% dans nos
                cinémas
                partenaires</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
        </div>
    `
})

export class PopupComponent {
    @Input() name: string;

    constructor(public activeModal: NgbActiveModal) {
    }

}
