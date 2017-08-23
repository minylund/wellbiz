# Wellbiz
Application to gather feedback with a simple survey.
Built with React Native, using Firebase from GCP.

## Installation

To deploy the React Native app you need [Expo XDE](https://expo.io) installed and iOS Simulator with iPad as device or a physical iPad with [Expo](https://expo.io) app installed.

```sh
$ git clone https://github.com/minylund/wellbiz.git
$ cd wellbiz
$ npm install
```
After this you should run Expo XDE, open wellbiz project and run it on simulator or device by pressing **Device**.

Login credentials:
User ID: joel+100@qvik.fi
Password: qwerty

## Usage

After logging in, you can view existing surveys or create a new one by providing a title and type. After survey is selected or created, you come to the survey view where the user can give his/her emotion.
Survey answers are gathered to the Firebase database for further analysis.
You can get back to main menu by pressing the left top corner of the view and logging in again.

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Qvik 2017