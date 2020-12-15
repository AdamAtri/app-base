const shell = require('shelljs');
const { join } = require('path');

module.exports = function replaceGlobalType($logger, $projectData, hookArgs) {
  shell.cd(join($projectData.projectDir, 'node_modules', '@types', 'node'));
  const files = shell.find('globals.global.d.ts');
  if (files.length) {
    shell.sed('-i', "NodeJS.Global ", "NodeJS.Global & typeof globalThis", ...files);
    $logger.info('global type restored.');
  }
}