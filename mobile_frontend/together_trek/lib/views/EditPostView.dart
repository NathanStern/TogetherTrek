import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/models/LoadedPostsModel.dart';
import 'package:together_trek/models/PostModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/AlertView.dart';
import 'package:together_trek/views/HomeView.dart';
import 'package:together_trek/views/TempProfileView.dart';

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
            decoration: InputDecoration(hintText: "Title"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a title';
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
            decoration: InputDecoration(hintText: "Description"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a description';
              }
              return null;
            },
            onSaved: (val) => setState(() => _description = val),
          ),
          TextFormField(
            initialValue: _country,
            decoration: InputDecoration(hintText: "Country"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a country';
              }
              return null;
            },
            onSaved: (val) => setState(() => _country = val),
          ),
          TextFormField(
            initialValue: _city,
            decoration: InputDecoration(hintText: "City"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a city';
              }
              return null;
            },
            onSaved: (val) => setState(() => _city = val),
          ),
          TextFormField(
            initialValue: _region,
            decoration: InputDecoration(hintText: "State/Region"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a region';
              }
              return null;
            },
            onSaved: (val) => setState(() => _region = val),
          ),
          Row(children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                onPressed: () async {
                  // Validate returns true if the form is valid, or false
                  // otherwise.
                  if (_formKey.currentState.validate()) {
                    final form = _formKey.currentState;
                    form.save();

                    await updatePost(context, _id, _title, _description,
                        _country, _city, _region, post);
                    Navigator.pop(context);
                    LoadedPostsModel loadedPosts =
                        context.read<LoadedPostsModel>();
                    loadedPosts.notifyListeners();
                  }
                },
                child: Text('Submit'),
              ),
            ),
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: ElevatedButton(
                  onPressed: () async {
                    // Validate returns true if the form is valid, or false
                    // otherwise.
                    if (_formKey.currentState.validate()) {
                      final form = _formKey.currentState;
                      form.save();

                      bool success = await deletePost( _id);
                      Navigator.pop(context);
                      if (success) {
                        LoadedPostsModel loadedPosts =
                            context.read<LoadedPostsModel>();
                        loadedPosts.removePost(_id);
                      } else {
                      showDialog(
                          context: context,
                          builder: (context) => buildStandardDialog(
                              context,
                              "Delete Error",
                              "Could not delete post."));
                      }
                    }
                  },
                  child: Text('Delete'),
                )),
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: ElevatedButton(
                  onPressed: () async {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => TempProfileView()),
                    );
                  },
                  child: Text('View Author'),
                ))
          ])
        ],
      ),
    );
  }
}
