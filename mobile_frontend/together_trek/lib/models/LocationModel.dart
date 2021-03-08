class LocationModel {
  List<dynamic> coordinates;
  LocationModel(List<dynamic> coordinates) {
    this.coordinates = coordinates;
  }

  LocationModel.empty() {
    this.coordinates = [0, 0];
  }

  void setCoordinates(List<dynamic> newCoords) {
    if (newCoords.isEmpty) {
      this.coordinates = [0, 0];
      return;
    }
    this.coordinates = newCoords;
  }

  @override
  String toString() {
    if (this.coordinates.isEmpty) {
      return "empty";
    }
    return "x: ${this.coordinates[0]} y: ${this.coordinates[1]}";
  }
}
