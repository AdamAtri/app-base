const { networkInterfaces } = require('os');
const shell = require('shelljs');
const { join } = require('path');

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
  shell.cd(join($projectData.projectDir, 'app'));
  const files = shell.find('app-config.ts');
  const ip = getLocalIp();
  if (!files.length) 
    shell.exec(`echo "export const LOCALHOST:string = '${ip}'" >> app-config.ts`);
  $logger.info(`app-config updated with server ip: ${ip}`);
}