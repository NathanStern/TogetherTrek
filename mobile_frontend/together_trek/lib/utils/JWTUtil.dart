import 'package:shared_preferences/shared_preferences.dart';

void saveJWT(String jwt) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();

  await prefs.setString('jwt', jwt);
}
