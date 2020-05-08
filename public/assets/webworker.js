// this code will run in a separate worker and interface with the run.html
// page's DOM through message passing

importScripts('./lib/closure-compiled/long.js');
goog.require('goog.math.Long');

importScripts('./lib/javascript-biginteger/biginteger.js');
Long = goog.math.Long;

importScripts(
  './devices/character.js',
  './lib/binfile/binfile.js',
  './mappings.js',
  './utils.js',
  './mmu.js',
  './trap.js',
  './elfload.js',
  './inst.js',
  './cpu.js',
  './elfrun.js'
);

self.addEventListener(
  'message',
  function (oEvent) {
    if (oEvent.data.type == 'r') {
      //continue running
      readTest.push('\n');
      elfRunNextInst();
    } else if (oEvent.data.type == 'u') {
      // copy user input
      DAT = oEvent.data.inp;
      if (DAT == 'THIS_IS_ESC') {
        readTest.push(DAT);
      } else {
        for (var x = 0; x < DAT.length; x++) {
          readTest.push(DAT.charAt(x));
        }
      }
      elfRunNextInst();
    } else if (oEvent.data === 'fetchCpu') {
      sendCpuState();
    }
  },
  false
);

function sendCpuState() {
  //console.log('webworker responding fetchCpu request');
  // TODO: add a sendState method for each UI component?
  //       only worried if the same state will be expressed in each method, due to threading issues
  const instructionsArray = [];

  // computes exponential rolling average
  for (key in RISCV.curr_instructions) {
    RISCV.instruction_amounts[key][1]++;
    const currKeyTotal = parseFloat(RISCV.instruction_amounts[key][1]);
    RISCV.instruction_amounts[key][0] -= (RISCV.instruction_amounts[key][0] / currKeyTotal);
    RISCV.instruction_amounts[key][0] += (RISCV.curr_instructions[key] / currKeyTotal);
  }

  var total = 0;
  
  // compute the total num of instructions and push the latest exponential rolling average
  for (key in RISCV.instruction_amounts) {
    instructionsArray.push(
      {
        label: key,
        value: RISCV.instruction_amounts[key][0]
      }
    );
    total += RISCV.instruction_amounts[key][0];
  }


  const payload = {
    type: 'returnCpu',
    d: JSON.stringify({
        registers: RISCV.gen_reg,
        instruction_amounts: instructionsArray,
        total: total
    }),
  };

  this.postMessage(payload);
  
  // reset the number of each instructions for the next clock cycle
  RISCV.curr_instructions[RISCV.keyMath] = 0;
  RISCV.curr_instructions[RISCV.keyJump] = 0;
  RISCV.curr_instructions[RISCV.keyStore] = 0;
  RISCV.curr_instructions[RISCV.keyLoad] = 0;
  RISCV.curr_instructions[RISCV.keyMem] = 0
}

function runCodeC(userIn) {
  //compilestat = document.getElementById("compilestatus");
  //compilestat.innerHTML = "Compile Status: Compiling, waiting for server response.";
  filesList = ['lib/riscv_compiled/vmlinux'];

  handle_file_continue(filesList);

  RISCV = new CPU();

  updateCPU();
}

function updateCPU(){
  sendCpuState();
  setTimeout(updateCPU, 1000);
}


function handle_file_continue(filesList) {
  //document.getElementById("testresult").innerHTML = "ELF not loaded";
  //tab = document.getElementById("regtable");
  //elfproptab = document.getElementById("elfprops");
  //debugtab = document.getElementById("debugprops");

  // execution pause
  pauseExec = false;

  GetBinaryFile(
    filesList[0],
    chainedFileLoader,
    filesList.slice(1, filesList.length)
  );
}

runCodeC();