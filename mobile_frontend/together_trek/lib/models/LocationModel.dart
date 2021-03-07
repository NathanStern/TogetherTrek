class LocationModel {
  List<double> coordinates;
  LocationModel(List<double> coordinates) {
    this.coordinates = coordinates;
  }

  LocationModel.empty() {
    this.coordinates = [0, 0];
  }

  void setCoordinates(List<double> newCoords) {
    this.coordinates = newCoords;
  }

  @override
  String toString() {
    return "x: ${this.coordinates[0]} y: ${this.coordinates[1]}";
  }
}
