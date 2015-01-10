// Global System Events reference
var SystemEvents = Application("System Events");

function Skype(){
  var app = null // this needs to be lazy initialized

  var command = function(cmd){
    if(!app) app = Application("Skype")
    return app.send({command: cmd, scriptName: "script"})
  }

  this.isRunning = function(){
    return (SystemEvents.processes.whose({ name: 'Skype' }).length > 0)
  }

  this.setStatus = function(status, message){
    command("SET USERSTATUS " + status)
  }

  this.getStatus = function(){
    return command("GET USERSTATUS").split(" ").pop()
  }

  this.isOnCall = function(){
    var calls = command("SEARCH ACTIVECALLS")
    var id = calls.split(" ").pop()
    if(id != ""){
      status = command("GET CALL " + id + " STATUS").split(" ").pop()
      return (status == "INPROGRESS")
    } else {
      return false
    }
  }
}


function HipChat(){
  this.isRunning = function(){
    return (SystemEvents.processes.whose({ name: 'HipChat' }).length > 0)
  }


  setStatusViaSlash = function(status, message){
    // HipChat is not scriptable, so we need to use SystemEvents
    var Dock = SystemEvents.processes["Dock"]
    var HipChat = Dock.lists[0].uiElements["HipChat"]

    // Activate HipChat window
    HipChat.click()

    // Hit Escape few times, just in case some popup is open
    SystemEvents.keyCode(53) // Esc
    SystemEvents.keyCode(53) // Esc

    // Copy current text input content to clipboard
    SystemEvents.keystroke("a", { using: "command down" }) // Cmd+A
    SystemEvents.keystroke("c", { using: "command down" }) // Cmd+C

    // Type in HipChat command (see http://help.hipchat.com/knowledgebase/articles/64451-work-faster-with-slash-commands)
    SystemEvents.keystroke("/" + status + " " + (message || ""))
    SystemEvents.keyCode(36) // 'return' key code, see http://apple.stackexchange.com/questions/36943/how-do-i-automate-a-key-press-in-applescript

    // Paste previous message
    SystemEvents.keystroke("v", { using: "command down" }) // Cmd+V

    // Bring back previous application to front
    SystemEvents.keyCode(48, { using: "command down" }) // Cmd+Tab

  }

  setStatusViaDock = function(status){
    // HipChat is not scriptable, so we need to use SystemEvents
    var Dock = SystemEvents.processes["Dock"]
    var HipChat = Dock.lists[0].uiElements["HipChat"]

    var statusMap = {
      "available":  0,
      "away":       1,
      "dnd":        2
    }

    HipChat.actions["AXShowMenu"].perform()
    HipChat.menus[0].menuItems["Status"].click()
    HipChat.menus[0].menuItems["Status"].menus[0].menuItems[statusMap[status]].click()
  }

  this.setStatus = function(status, message){
    if(message) {
      setStatusViaSlash(status, message)
    } else {
      setStatusViaDock(status)
    }
  }

  this.getStatus = function(){
    // Not Yet Implemented
  }
}

(function(){
  var hipchat = new HipChat()
  var skype   = new Skype()
  var autodnd = false

  while(1){
    if(skype.isRunning() && hipchat.isRunning()){
      if(skype.isOnCall()){
        if(!autodnd){
          hipchat.setStatus("dnd", "Skype")
          autodnd = true
        }
      } else {
        if(autodnd){
          hipchat.setStatus("available")
          autodnd = false
        }
      }
    }

    delay(5)
  }
})()
