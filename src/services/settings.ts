import * as vscode from 'vscode';
import { AppSetting } from "../extension";


export let getSettings = () => {
  const config = vscode.workspace.getConfiguration('recompyle');
  const settings = config.get<AppSetting[]>('settings');
  return settings;
};

export async function updateSettings(settings: AppSetting[]) {
  const config = vscode.workspace.getConfiguration('recompyle');
  await config.update('settings', settings, vscode.ConfigurationTarget.Global);
}

export function createSetting(workspaceRoot: string): AppSetting {
  return {
    workspaceRoot: workspaceRoot,
    enabled: true,
    port: 3101,
    breakpointListener: true,
    openedFilesListener: true
  };
}
