import * as vscode from 'vscode';
import {
  getSettingsWithFilePath,
  getSocketWithFilePath, getSocketWithPort
} from "../services/socket-manager";

export let selectFileCommand = vscode.commands.registerCommand('recompyle.SelectFile', () => {
  vscode.window.showInformationMessage('Select File Recompyle!');

  if (vscode.window.activeTextEditor?.document.uri.path) {
    const filePath = vscode.window.activeTextEditor?.document.uri.path;
    const settings = getSettingsWithFilePath(filePath);
    if (settings) {
      getSocketWithPort(settings.port)?.selectFile(settings.workspaceRoot, filePath);
    }
  }
});