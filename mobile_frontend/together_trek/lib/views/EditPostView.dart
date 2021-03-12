import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:together_trek/models/PostModel.dart';

import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/views/HomeView.dart';

class EditPostView extends StatefulWidget {
  EditPostView({Key key, this.post}) : super(key: key);

  PostModel post;

  _EditPostViewState createState() => _EditPostViewState(post: post);
}
class _EditPostViewState extends State<EditPostView> {
   _EditPostViewState({this.post});
  PostModel post;
   @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text("Edit Post"),
        ),
        body: MyCustomForm(post: post),
       
    );
  }
}
class MyCustomForm extends StatefulWidget {
   MyCustomForm({Key key, this.post}) : super(key: key);
  PostModel post;
  @override
  MyCustomFormState createState() {
    return MyCustomFormState(post: post);
  }
}
class MyCustomFormState extends State<MyCustomForm> {
   MyCustomFormState({this.post});
  PostModel post;
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  String _title;
  String _description;
  String _country;
  String _city;
  String _region;
  String _id;

  @override
  Widget build(BuildContext context) {
    if (post == null) {
      print("bad post");
    }
    _title = post.title;
    _description = post.description;
    _country = post.destinations[0].country;
    _city = post.destinations[0].city;
    _region = post.destinations[0].region;
    _id = post.id;

    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TextFormField(
            initialValue: _title,
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter some text';
              }
              return null;
            },
            onSaved: (value) {
                setState(() {
                _title = value;
                });
            },
          ),
          TextFormField(
            initialValue: _description,
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter some text';
              }
              return null;
            },
            onSaved: (val) => setState(() => _description = val),
          ),
            TextFormField(
              initialValue: _country,
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter some text';
              }
              return null;
            },
            onSaved: (val) => setState(() => _country = val),
          ),
            TextFormField(
              initialValue: _city,
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter some text';
              }
              return null;
            },
            onSaved: (val) => setState(() => _city = val),
          ),
            TextFormField(
              initialValue: _region,
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter some text';
              }
              return null;
            },
            onSaved: (val) => setState(() => _region = val),
          ),

          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: ElevatedButton(
              onPressed: () {
                // Validate returns true if the form is valid, or false
                // otherwise.
                if (_formKey.currentState.validate()) {
                  final form = _formKey.currentState;
                  form.save();
                  // If the form is valid, display a Snackbar.
                  updatePost(context, _title, _id, _description, _country, _city, _region);
                   Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => HomeView()),
                    );
                }
              },
              child: Text('Submit'),
            ),
          ),
        ],
      ),
    );
  }
}