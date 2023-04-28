# Custom Dial Macro

Welcome to our WXSD DEMO Repo!

This Webex Device macro creates a custom dial button on your device which lets a user enter a text or number input. The macro will then match the input input text/number using regular expressions and modify it before dialling.

![image](https://user-images.githubusercontent.com/21026209/235207422-f28d2b3c-f858-42dd-b14f-c25fa4237962.png)

### Flow Diagram

![image](https://user-images.githubusercontent.com/21026209/235206216-20d3dce8-c985-44df-a3bb-1a37db528f02.png)


## Features

- Automatically downloads a custom image for custom icons
- Saves a custom button UI extension to the device using the downloaded images as the icon uses
- Let's users enter dial information using a native text input prompt
- Matches that dial string with an array of regular expression which can append digits or SIP domains before dialling.


## Setup

### Prerequisites & Dependencies:

- RoomOS/CE 9.15 or above Webex Device
- Web admin access to the device to upload the macro.
- A web hosted image icon to download ( example provided in the macro config )
- Network connectivity for the device to download the image icon (i.e. No firewall restrictions)

### Installation Steps:

1. Download the ``custom-dial-macro.js`` file and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.


## Validation

Validated Hardware:

* Room Kit Pro
* Desk Pro
* Room Kit

This macro should work on other Webex Devices with WebEngine support but has not been validated at this time.

## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).

## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions

Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=custom-dial-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
