import * as vscode from 'vscode';
import { initProjects, reloadSockets } from "../services/project-manager";


export let onConfigChange = vscode.workspace.onDidChangeConfiguration(event => {
  if (event.affectsConfiguration('recompyle.settings')) {
    const updatedSettingValue = vscode.workspace.getConfiguration('yourExtensionName').get('yourSettingName');
    console.log(`Setting updated to: ${updatedSettingValue}`);

    reloadSockets();
  }
});