import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import RegisterPanel from './components/RegisterPanel';
import InstructionPanel from './components/InstructionPanel';
import MemoryPanel from './components/MemoryPanel';
import { REG_PANEL, INST_PANEL, MEM_PANEL } from './utils/elementIds';
import styles from './utils/style';

// Chart.js configs
Chart.defaults.global.defaultFontFamily = styles.font;
Chart.defaults.global.defaultFontColor = styles.color.g5;
// console.log('size', parseInt(styles.sz1, 10));
Chart.defaults.global.defaultFontSize = parseInt(styles.size[1], 10);
Chart.defaults.global.aspectRatio = 3 / 2;
Chart.defaults.global.responsive = true;

ReactDOM.render(<RegisterPanel />, document.querySelector(REG_PANEL));
ReactDOM.render(<InstructionPanel />, document.querySelector(INST_PANEL));
ReactDOM.render(<MemoryPanel />, document.querySelector(MEM_PANEL));
