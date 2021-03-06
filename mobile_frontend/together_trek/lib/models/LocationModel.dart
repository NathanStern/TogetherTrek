class LocationModel {
  List<double> coordinates;
  LocationModel(List<double> coordinates) {
    this.coordinates = coordinates;
  }

  void setCoordinates(List<double> newCoords) {
    this.coordinates = newCoords;
  }
}
