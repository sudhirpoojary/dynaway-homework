import { Asset } from "../models/asset.model";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

export const mockAssets: Asset[] = [
  {
    id: "e7833d96",
    type: "Forklift",
    name: "Forklift FL-1",
    locationId: "AAL",
    locationName: "Aalborg warehouse",
    image: "",
    model: "FL-1 Model",
    warrantyLength$: of("expired").pipe(delay(6000)),
    maintenanceNotes: "Regular maintenance required.",
  },
  {
    id: "ca87b865653f",
    type: "Forklift",
    name: "Forklift FL-2",
    locationId: "AAL",
    locationName: "Aalborg warehouse",
    image:
      "https://cdn.pixabay.com/photo/2012/11/30/14/20/fork-68042_960_720.jpg",
    model: "FL-2 Model",
    warrantyLength$: of("3 month(s) remaining").pipe(delay(6000)),
    maintenanceNotes: "Scheduled maintenance every 6 months.",
  },
  {
    id: "6f318992",
    type: "Car",
    name: "Skoda Octavia",
    locationId: "CPH-01",
    locationName: "Copenhagen office",
    image:
      "https://cdn.pixabay.com/photo/2018/03/28/17/42/skoda-octavia-3269945_960_720.png",
    model: "Octavia Model",
    warrantyLength$: of("1 month(s) remaining").pipe(delay(6000)),
    maintenanceNotes: "Requires oil change every 10,000 miles.",
  },
  {
    id: "87997b682313",
    type: "Car",
    name: "Audi A4",
    locationId: "CPH-01",
    locationName: "Copenhagen office",
    image: "",
    model: "A4 Model",
    warrantyLength$: of("2 month(s) remaining").pipe(delay(6000)),
    maintenanceNotes: "Annual maintenance check-up recommended.",
  },
  {
    id: "dde101b1",
    type: "Air compressor",
    name: "COM-001 Air Compressor",
    locationId: "CPH-03",
    locationName: "Production line",
    image: "",
    model: "COM-001 Model",
    warrantyLength$: of("expired").pipe(delay(6000)),
    maintenanceNotes: "Clean filters monthly for optimal performance.",
  },
  {
    id: "31a92936eed7",
    type: "Motor-DC",
    name: "DCM-201 Motor for EX-201",
    locationId: "CPH-03",
    locationName: "Production line",
    image: "",
    model: "DCM-201 Model",
    warrantyLength$: of("3 month(s) remaining").pipe(delay(6000)),
    maintenanceNotes: "Lubricate bearings every 6 months.",
  },
];

/*
  This is how a response from the server would look like
 */
export const mockAssetHttpResponse = {
  ok: true,
  data: mockAssets,
};
