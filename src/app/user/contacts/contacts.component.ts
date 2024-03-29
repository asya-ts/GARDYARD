import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Contacts } from 'src/app/shared/interfaces';
import { ContactsService } from 'src/app/shared/services';
import { AlertService } from 'src/app/_alert';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    private contacts$ = new Subject();

    selected: Contacts = null;
    contacts: Contacts[] = [];

    constructor(private contactsService: ContactsService,
        private alert: AlertService) {}

    ngOnInit(): void {
        this.contacts$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.contactsService.getAll().pipe(take(1)).subscribe(contacts => {
                    this.contacts = contacts;
                    this.selected = this.contacts[0];
                }, () => {
                    this.alert.fire('Error', 'Something went wrong.', false);
                });
            });
        this.contacts$.next();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.complete();
        this.unsubscribe$.unsubscribe();
    }

    select(item: Contacts): void {
        this.selected = item;
    }
}
