import 'package:flutter/material.dart';

class LaunchView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Future.delayed(Duration(seconds: 2), () {
      Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
    });
    return Scaffold(
        backgroundColor: Colors.white,
        body: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image(
                      image: ResizeImage(AssetImage('lib/resources/logo.jpg'),
                          allowUpscaling: true,
                          height:
                              (MediaQuery.of(context).size.height / 2).toInt()),
                      width: (MediaQuery.of(context).size.width / 1)),
                ],
              ),
            ],
          ),
        ));
  }
}
