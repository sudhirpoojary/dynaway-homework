import { Observable } from "rxjs";

export interface Asset {
  id: string
  type: string
  name: string
  locationId: string
  locationName: string
  image?: string
  maintenanceNotes: string
  model: string
  warrantyLength$: Observable<string>
}
