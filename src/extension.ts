import * as vscode from 'vscode';
import { initProjects } from "./services/project-manager";
import { clearSocketInstances } from "./services/socket-manager";


export function activate(context: vscode.ExtensionContext) {
  console.log('Starting Recompyle');
  initProjects(context);
}

export function deactivate() {
  clearSocketInstances();
}


export interface FileCursor {
  filePath: string;
  line: number;
  column: number;
}

export interface AppSetting {
  workspaceRoot: string;
  enabled?: boolean;
  port: number;
  breakpointListener?: boolean;
  openedFilesListener?: boolean;
}