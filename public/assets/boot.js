var myCpu;

term = new Terminal({
  cols: 100,
  rows: 32,
  cursorBlink: true,
  useStyle: true,
});

function runWorker() {
  myWorker = new Worker("assets/webworker.js");
  myWorker.onmessage = function (oEvent) {
    if (oEvent.data.type == "t") {
      term.write(String.fromCharCode(oEvent.data.d));
    } else if (oEvent.data.type === "returnCpu") {
      myCpu = JSON.parse(oEvent.data.d);
      //console.log('main thread setting myCpu');
    }
  };
}

function prepTerm() {
  term.open(document.getElementById("consoleBox"));
  term.handler = function a(indata2) {
    myWorker.postMessage({ type: "u", inp: indata2 });
  };
}

prepTerm();
runWorker();
