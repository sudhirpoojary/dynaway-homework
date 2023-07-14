import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first, map, Subscription, switchMap } from "rxjs";
import { AssetService } from "../shared/services/asset.service";
import { Asset } from "../shared/models/asset.model";
import { getRandomWidth } from "../shared/functions";

@Component({
  selector: "app-asset-detail",
  templateUrl: "./asset-detail.page.html",
  styleUrls: ["./asset-detail.page.scss"],
})
export class AssetDetailPage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  details?: Asset;
  skeletonWidths = [0, 1].map(() => getRandomWidth(70, 130, "px"));

  constructor(
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap
        .pipe(
          first(),
          map((paramMap) => {
            const assetId = paramMap.get("id");
            if (!assetId) throw Error("List ID not found");
            return assetId;
          }),
          switchMap((id) => {
            return this.assetService.getAssetDetails(id);
          }),
          map((asset) => {
            if (!asset) throw Error("Asset not found");
            return asset;
          }),
        )
        .subscribe({
          next: (asset) => {
            console.log(asset);
            this.details = asset;
          },
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
