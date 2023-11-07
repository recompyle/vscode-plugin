import * as vscode from 'vscode';
import { createSetting, getSettings, updateSettings } from "./settings";
import { initSocketInstances } from "./socket-manager";
import { initListeners } from "../listeners/_listeners";
import { selectFileCommand } from "../command/select-file";


export async function initProjects(context: vscode.ExtensionContext) {
  console.log('init project');
  await initSettings();
  initSocketInstances();
  initListeners(context);
  context.subscriptions.push(selectFileCommand);
}

export async function reloadSockets(){
  await initSettings();
  initSocketInstances();
}

async function initSettings() {
  const settings = getSettings();
  // console.log(settings);

  // each workspace
  vscode.workspace.workspaceFolders?.forEach(workspace => {
    let workspaceSettings = settings?.find(set => set.workspaceRoot === workspace.uri.path);
    console.log(workspaceSettings);
    if (workspaceSettings === undefined) {
      console.log('create settings', workspace.uri);
      workspaceSettings = createSetting(workspace.uri.path);
      settings?.push(workspaceSettings);
    }
  });

  if (settings) {
    await updateSettings(settings);
  }

}

