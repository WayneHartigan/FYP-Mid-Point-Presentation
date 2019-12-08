function permission(){
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then((mediaStream) => {
  })
  .catch((error) => {
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.command == 'newDom'){
    console.log(request.command);
    var newDiv = document.createElement('span');

    var msg = "New DOM Example!";
    newDiv.innerHTML = msg;
    newDiv.setAttribute("style", "background-color:blue; font-size:15px; height:50px; width:50px; color:white;");
    document.body.appendChild(newDiv);
    sendResponse({result: "success"});
  }
  if (request.command == 'changeDom'){
    let para = document.getElementsByTagName("p");
    for (elt of para){
      elt.style['background-color'] = 'blue';
    }
    sendResponse({result: "success"});
  }
})

//chrome-extension://pnkmlcallnmdidjffeknfmoljehlhfek/index.html
