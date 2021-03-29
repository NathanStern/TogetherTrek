import 'package:flutter/material.dart';

Widget buildStandardDialog(
    BuildContext context, String title, String description) {
  return Dialog(
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
    elevation: 3,
    backgroundColor: Colors.white,
    child: Stack(
      children: <Widget>[
        Container(
          padding: EdgeInsets.only(top: 5, right: 10, left: 10),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 15),
              Text(title,
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              SizedBox(
                height: 15,
              ),
              Text(
                description,
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.normal),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 22),
              Align(
                  alignment: Alignment.bottomRight,
                  child: TextButton(
                    child: Text("Close"),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  )),
            ],
          ),
        ),
      ],
    ),
  );
}

Widget buildActionDialog(
    BuildContext context, String title, String description, Function onClose) {
  return Dialog(
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
    elevation: 3,
    backgroundColor: Colors.white,
    child: Stack(
      children: <Widget>[
        Container(
          padding: EdgeInsets.only(top: 5, right: 10, left: 10),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 15),
              Text(title,
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              SizedBox(
                height: 15,
              ),
              Text(
                description,
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.normal),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 22),
              Align(
                  alignment: Alignment.bottomRight,
                  child: TextButton(
                    child: Text("Close"),
                    onPressed: () {
                      Navigator.of(context).pop();
                      onClose();
                    },
                  )),
            ],
          ),
        ),
      ],
    ),
  );
}
