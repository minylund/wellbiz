# Wellbiz
Application to gather feedback with a simple survey.
Built with React Native, using Firebase from GCP.

## Installation

To deploy the React Native app you need [Expo XDE](https://expo.io) installed and iOS Simulator with iPad as device or a physical iPad with [Expo](https://expo.io) app installed. Run the following commands:

```sh
$ git clone https://github.com/minylund/wellbiz.git
$ cd wellbiz
$ npm install
```
After this you should run Expo XDE, login with your Expo account, open wellbiz project and run it on simulator by pressing **Device** or on your device by pressing **Share** and using the QR code to open the app.

Login credentials:

User ID: joel+100@qvik.fi  
Password: qwerty

## Usage

After logging in, you can view existing surveys or create a new one by providing its title and type. After survey is created, or opened from the survey list, you come to the survey view where the user can give his/her feedback on the current topic. You can get back to main menu by pressing and holding the left top corner of the view and logging in again.

Survey answers are gathered to the Firebase database for further analysis. Results for each survey can also be viewed from the survey list by pressing **Results**. 

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Qvik 2017