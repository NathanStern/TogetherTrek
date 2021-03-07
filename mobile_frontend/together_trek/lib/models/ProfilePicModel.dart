class ProfilePicModel {
  String url;
  String uploadDate;

  ProfilePicModel(String url, String uploadDate) {
    this.url = url;
    this.uploadDate = uploadDate;
  }

  ProfilePicModel.empty() {
    this.url = "";
    this.uploadDate = "";
  }

  @override
  String toString() {
    return "url: ${this.url} date: ${this.uploadDate}";
  }
}
