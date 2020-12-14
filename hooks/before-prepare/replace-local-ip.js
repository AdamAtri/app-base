const { networkInterfaces } = require('os');
const shell = require('shelljs');
const { join } = require('path');
const { get } = require('https');

function getLocalIp() {
  const nets = networkInterfaces();
  let resultIP = null;

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        if (net.address.startsWith('192.168') || net.address.startsWith('10.'))
          resultIP = net.address;
          break;
      }
    }
  }
  return resultIP;
}



module.exports = function replaceLocalIp($logger, $projectData, hookArgs) {
  shell.cd(join($projectData.projectDir, 'app', 'net'));
  shell.sed('-i', '<localhost>', getLocalIp(), ['api.ts']);
}