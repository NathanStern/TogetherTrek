class DestinationModel {
  String id;
  String country;
  String region;
  String city;

  DestinationModel({this.id, this.country, this.region, this.city});

  factory DestinationModel.fromJson(Map<String, dynamic> json) {
    return DestinationModel(
        city: json['city'],
        country: json['country'],
        region: json['region'],
        id: json['_id']);
  }

  Map<String, dynamic> toJson() => {
        //'_id': this.id,
        'country': this.country,
        'region': this.region,
        'city': this.city
      };

    @override
    String toString() {
        return city + ", " + region + ", " + country;
      }
}
