// this code will run in a separate worker and interface with the run.html
// page's DOM through message passing



importScripts('./lib/closure-compiled/long.js');
goog.require('goog.math.Long');

importScripts('./lib/javascript-biginteger/biginteger.js');
Long = goog.math.Long;

const CLOCK_CYCLE = 500;

let prevDump = null;

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
      sendCpuState();
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
      sendCpuState();
    }
  },
  false
);

function sendCpuState() {
  const instructionsArray = [];

  for (key in RISCV.curr_instructions) {

    // this computes a running average
    RISCV.instruction_amounts[key].count++;
    const currKeyTotal = parseFloat(RISCV.instruction_amounts[key].count);
    const downTug = RISCV.curr_instructions[key] - RISCV.instruction_amounts[key].average;
    RISCV.instruction_amounts[key].average += (downTug / currKeyTotal);

  }

  var totalInstructions = 0;
  
  // compute the total num of instructions and push the latest running average
  for (key in RISCV.instruction_amounts) {
    instructionsArray.push(
      {
        label: key,
        value: RISCV.instruction_amounts[key].average
      }
    );
    totalInstructions += RISCV.instruction_amounts[key].average;
  }

  // compute num of nonzero words in memory
  var num = 0;
  for (const [index, element] of RISCV.memory.entries()) {
    if (element != 0) {
      num++;
    }
  }

  const payloadData = {
    registers: RISCV.gen_reg,
    instruction_amounts: instructionsArray,
    totalInstructions: totalInstructions,
    nonzeroMemoryTotal: num,
    memoryTotal: RISCV.memory.length,
  };

  // short-circuiting with !prevDump wasnt working
  if ((prevDump != null) && !hasUpdated(payloadData)) {
    return;
  }

  const convertedValues = [];
  for (var i = 0; i < RISCV.gen_reg.length; i++) {
    convertedValues.push(RISCV.gen_reg[i].toNumber());

  }

  const realPayload = {
    registers: convertedValues,
    instruction_amounts: instructionsArray,
    totalInstructions: totalInstructions,
    nonzeroMemoryTotal: num,
    memoryTotal: RISCV.memory.length,
  }
  
  const payload = {
    type: 'returnCpu',
    d: JSON.stringify(realPayload),
  };

  this.postMessage(payload);
  
  prevDump = {
    registers: RISCV.gen_reg,
    instruction_amounts: instructionsArray,
    totalInstructions: totalInstructions,
    nonzeroMemoryTotal: num,
    memoryTotal: RISCV.memory.length,
  };
  
  // reset the number of each instructions for the next clock cycle
  RISCV.curr_instructions.arithmetic = 0;
  RISCV.curr_instructions.branch = 0;
  RISCV.curr_instructions.store = 0;
  RISCV.curr_instructions.load = 0;
  RISCV.curr_instructions.memoryOrder = 0;
}

function runCodeC(userIn) {
  //compilestat = document.getElementById("compilestatus");
  //compilestat.innerHTML = "Compile Status: Compiling, waiting for server response.";
  filesList = ['lib/riscv_compiled/vmlinux'];

  handle_file_continue(filesList);

  RISCV = new CPU();

  // initial
  sendCpuState();
  
  // keeping this to remember its called here.
  // updateCPU();
}

function updateCPU() {
  sendCpuState();
  setTimeout(updateCPU, CLOCK_CYCLE);
}

function hasUpdated(payloadData) {
  if (prevDump.nonzeroMemoryTotal != payloadData.nonzeroMemoryTotal) {
    return true;
  }

  for (var i = 0; i < prevDump.registers.length; i++) {
    if (prevDump.registers[i].toNumber() != payloadData.registers[i].toNumber()) {
      return true;
    }
  }

  return false;
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