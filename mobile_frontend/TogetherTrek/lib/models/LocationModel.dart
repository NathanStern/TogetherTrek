import 'dart:ffi';

class LocationModel {
  List<Float> coordinates;
  LocationModel(List<Float> coordinates) {
    this.coordinates = coordinates;
  }

  void setCoordinates(List<Float> newCoords) {
    this.coordinates = newCoords;
  }
}
