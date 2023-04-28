/********************************************************
 * 
 * Macro Author:  William Mills
 *                Technical Solutions Specialist 
 *                wimills@cisco.com
 *                Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 04/28/23
 * 
 * This Webex Device macro enables you to display user guides as
 * webviews on your devices main display or Room Navigator.
 * 
 * Full Readme and source code and license details available here:
 * https://github.com/wxsd-sales/custom-dial-macro
 * 
 ********************************************************/

import xapi from 'xapi';

const config = {
  baseID:'dialpad', // Base panel Id use to prevent conflict with other UI Extensions
  button: { // UI Extention Button Config, the URL 
    name: 'Webex Call',
    icon: 'custom',
    url: 'https://wxsd-sales.github.io/kiosk-demos/icons/webex-logo.png'
  },
  prompt: {
    placeholder: 'Conference ID',
    title: 'Webex Call',
    text: 'Enter the Webex Conference ID',
    submitText: 'Dial'
  }
}

const patterns = [
  { regex: '^([0-9]{8})$', action: 'append', number: '@webex.com' }, // Matches 8 digits -> <dialled> + '@webex.com'
  { regex: '^(.*)@(.*)$', action: 'continue' }, //Matches *@* URI -> Ignores URIs, allows to continue
  { regex: '^(.*)$', action: 'append', number: '@company.webex.com' } // Matches everything else -> <dialled> + '@company.webex.com'
]

xapi.Event.UserInterface.Message.TextInput.Response.on(processTextInput)
xapi.Event.UserInterface.Extensions.Panel.Clicked.on(processClicks)
createPanel(config);

function getIcon(url){
  console.log('Downloading Icon from: ' + url);
  return xapi.Command.UserInterface.Extensions.Icon.Download({ Url: url })
  .then(result => result.IconId)
  .catch(error => {
    console.log('Unable to download icon: ' + error.message)
    return false
  })
}

function processClicks(event) {
  if (event.PanelId !== config.baseID) return;
  console.log(`Button [${config.button.name}] clicked, displaying Text Input`);
  xapi.Command.UserInterface.Message.TextInput.Display({
    InputType: 'Numeric',
    Placeholder: config.prompt.placeholder,
    Title: config.prompt.title,
    Text: config.prompt.text,
    SubmitText: config.prompt.submitText,
    FeedbackId: config.baseID
  }).catch(error => console.error(error));
}

function processTextInput(event) {
  if (event.FeedbackId !== config.baseID) return;
  const number = event.Text;
  console.log(`${config.button.name} Input [${number}]`)
  
  const match = patterns.find(pattern => {
    const re = new RegExp(pattern.regex)
    return re.test(number)
  });

  if (match) {
    switch (match.action) {
      case 'redirect':
        console.log(`Number matched with expression [${match.regex}] | Redirecting to: [${match.number}]`);
        dial(match.number)
        break;
      case 'prefix':
        console.log(`Number matched with expression [${match.regex}] | Redirecting to: [${match.number + number}]`);
        dial(match.number + number)
        break;
      case 'append':
        console.log(`Number matched with expression [${match.regex}] | Redirecting to: [${number + match.number}]`);
        dial(number + match.number)
        break;
      case 'continue':
        console.log(`Number matched with expression [${match.regex}] | Dialling as entered`);
        dial(number)
        break;
    }
  } else {
    console.log('Not match found, ignoring call');
  }
};


function dial(target) {
  console.log(`Calling: [${target}]`);
  xapi.Command.Dial({ Number: target });
}

async function createPanel({button, baseID}) {
  let icon = '';
  if(button.icon === 'custom'){
    const iconId = await getIcon(button.url)
    icon = `<Icon>Custom</Icon>
            <CustomIcon>
              <Id>${iconId}</Id>
            </CustomIcon>`
  } else {
    icon = `<Icon>${button.icon}</Icon>`
  }

  const panel = `
  <Extensions>
    <Panel>
      <Location>HomeScreen</Location>
      <Type>Statusbar</Type>
      ${icon}
      <Name>${button.name}</Name>
      <Color>#D43B52</Color>
      <ActivityType>Custom</ActivityType>
    </Panel>
  </Extensions>`;
  xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: baseID },
    panel
  )
}
