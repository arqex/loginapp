const {mergeConfig} = require('@react-native/metro-config');
const {getDefaultConfig} = require('expo/metro-config');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = { 
  watchFolders: [workspaceRoot],
  resolver: { 
    unstable_enableSymlinks: true,
    unstable_enablePackageExports: true,
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);