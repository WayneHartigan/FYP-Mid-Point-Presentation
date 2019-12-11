function sendMessagetoContext (msg){
  chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {command: msg}, function(response){
      console.log(response.result);
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
  function getSpeech (){
    var message = document.querySelector('#message');
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var grammar = '#JSGF V1.0;'
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = function(event) {
        var last = event.results.length - 1;
        var command = event.results[last][0].transcript;
        try{
          message.textContent = command;
        }
        catch (e){
          console.log("No voice picked up")
        }
        if (command.toLowerCase().includes('hey computer')){
          sendMessagetoContext("newDom");
        }
        else if (command.toLowerCase().includes('take note')){
          var note = command.split("take note").pop();
          alert(note);
        }
    };
    recognition.onend = function(event) {
      recognition.start();
    }
    recognition.onerror = function(event) {
      try{
        console.log(event.error)
      }
      catch (f){
        //do nothing
      }
    }
    recognition.start();
  }
  getSpeech();
}, false);
