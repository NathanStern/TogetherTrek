import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/models/TripModel.dart';
import 'package:together_trek/models/UserModel.dart';

class TripPhotosView extends StatefulWidget {
  TripModel trip;

  TripPhotosView(TripModel trip) {
    this.trip = trip;
  }

  _TripPhotosViewState createState() => _TripPhotosViewState(trip);
}

class _TripPhotosViewState extends State<TripPhotosView> {
  TripModel trip;

  _TripPhotosViewState(TripModel trip) {
    this.trip = trip;
  }

  final _picker = ImagePicker();
  Future<List<CachedNetworkImageProvider>> photos;

  @override
  Widget build(BuildContext context) {
    photos = getTripPhotos(trip.id);
    UserModel user = context.read<UserModel>();

    return Scaffold(
        appBar: AppBar(
          title: Text("Photos"),
        ),
        floatingActionButton: FloatingActionButton(
          child: Container(
              width: 56,
              height: 56,
              padding: EdgeInsets.all(5),
              child: Icon(Icons.add_a_photo)),
          onPressed: () async {
            final pickedFile =
                await _picker.getImage(source: ImageSource.gallery);

            if (pickedFile != null) {
              Map<String, dynamic> body = {
                "author_id": user.id,
                "trip_id": trip.id,
              };
              uploadTripPhoto(body, File(pickedFile.path));
            }
          },
        ),
        body: Container(
            child: FutureBuilder(
          future: photos,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              if (snapshot.data.length == 0) {
                return Container(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [Text("No Photos")],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          ElevatedButton(
                              onPressed: () {
                                setState(() {});
                              },
                              child: Text("Refresh"))
                        ],
                      )
                    ],
                  ),
                );
              }
              return RefreshIndicator(
                  onRefresh: () {
                    setState(() {});
                    return photos;
                  },
                  child: Container(
                      height: double.infinity,
                      child: GridView.builder(
                          physics: AlwaysScrollableScrollPhysics(),
                          shrinkWrap: true,
                          gridDelegate:
                              SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 3,
                            crossAxisSpacing: 3.0,
                            mainAxisSpacing: 3.0,
                          ),
                          itemCount: snapshot.data.length,
                          itemBuilder: (BuildContext context, int index) {
                            return GestureDetector(
                                onTap: () {
                                  Navigator.push(context,
                                      MaterialPageRoute(builder: (context) {
                                    return Scaffold(
                                        appBar: AppBar(),
                                        body: Container(
                                            child: Column(
                                                mainAxisAlignment:
                                                    MainAxisAlignment.center,
                                                children: [
                                              Row(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment.center,
                                                  children: [
                                                    Expanded(
                                                        child: Image(
                                                      image:
                                                          snapshot.data[index],
                                                    ))
                                                  ])
                                            ])));
                                  }));
                                },
                                child: Container(
                                    child: Image(
                                        fit: BoxFit.cover,
                                        image: ResizeImage(
                                          snapshot.data[index],
                                          height: (MediaQuery.of(context)
                                                      .size
                                                      .height /
                                                  3)
                                              .round(),
                                          // width: (MediaQuery.of(context)
                                          //             .size
                                          //             .width /
                                          //         3)
                                        ),
                                        key: ValueKey(0))));
                          })));
            } else {
              return Container(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [CircularProgressIndicator()],
                    )
                  ],
                ),
              );
            }
          },
        )));
  }
}
