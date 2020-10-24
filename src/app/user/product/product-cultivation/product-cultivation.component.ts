import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Plant } from 'src/app/shared/interfaces';
import { productAnimation } from '../product-animaiton';
import { ProductDataService } from '../product-data-service/-product-data.service';

@Component({
    selector: 'app-product-cultivation',
    templateUrl: './product-cultivation.component.html',
    styleUrls: ['./product-cultivation.component.scss'],
    animations: [productAnimation]
})
export class ProductCultivationComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    loading = true;
    product: Plant;

    constructor(private loaderService: LoaderService,
        private productDataService: ProductDataService) {}

    ngOnInit(): void {
        this.product = this.productDataService.get();

        this.loaderService
            .httpProgress()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.loading = status;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
