export class LocationModel {

    locationId: number;
    locationName: string;
    locationPictureUrl: string;

    constructor(locationId: number, locationName: string, locationPictureUrl: string) {
        this.locationId = locationId;
        this.locationName = locationName;
        this.locationPictureUrl = locationPictureUrl;
    }

}
