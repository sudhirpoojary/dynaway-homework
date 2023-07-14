import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Asset } from '../models/asset.model'
import { mockAssetHttpResponse } from './asset.test'
import { delay, tap } from 'rxjs/operators'
import { getRandomInt } from '../functions'

@Injectable({
  providedIn: 'root',
})
export class AssetService {

  constructor() {
  }

  getAll(): Observable<Asset[]> {
    return of(mockAssetHttpResponse.data).pipe(
      delay(getRandomInt(1000) + 500), // fake random http delay,
      tap(() => { // a small chance for the data fetch to error
        if (getRandomInt(10) % 10 === 0) throw Error('Http error')
      }),
    )
  }
  
  getAssetDetails(id: string): Observable<Asset | undefined> {
    const asset = mockAssetHttpResponse.data.find(asset => asset.id === id)
    return of(asset).pipe(delay(getRandomInt(1000) + 500))
  }
}
