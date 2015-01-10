# Set HipChat status based on Skype call in progress

This little tool will set your HipChat status to Do Not Disturb with "Skype" message if there is an active Skype call.
When the Skype call ends it will set your HipChat status back to Available

### [Demo](https://v.usetapes.com/6uNX9BZLu6)

## Requirements
- OS X 10.10 Yosemite
- HipChat 3.1.x
- Skype 6 (Skype 7 hasn't been tested yet)

## Installation
```
$ ./install.sh
```

## Running in development

```bash
$ osascript -l JavaScript SkypeHipchat.js
```

## Resources

- [JavaScript for OSX Automation](https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/)
- [Using OS X Accessibility Inspector](https://developer.apple.com/library/mac/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTesting/OSXAXTestingApps.html)
- [AppleScript keyCode reference](http://apple.stackexchange.com/questions/36943/how-do-i-automate-a-key-press-in-applescript)
- [HipChat slash commands](http://help.hipchat.com/knowledgebase/articles/64451-work-faster-with-slash-commands)
- [Skype API](http://web.archive.org/web/20130607130426/http://dev.skype.com/desktop-api-reference)
- [Skype test call](https://support.skype.com/en/faq/FA265/how-can-i-make-a-test-call-in-skype)


## Missing features

All ideas are very welcome

#### Preserving HipChat status
Currently it's not possible to get status from HipChat app in any way.
- HipChat desktop app does not expose AppleScript API
- There are no proper accessibility properties on top-right AXImage to differentiate between statuses
- HipChat HTTP API requires API key with admin rights to get user status


