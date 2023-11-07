import * as vscode from 'vscode';
import { getSocketWithFilePath } from "../services/socket-manager";
import { isFileInAllWorkspaceRoot } from "./project";

export function getOpenedFiles(allWorkspaceRoot: string[]) {

  const openedFiles: string[] = [];
  vscode.window.tabGroups.all.forEach(tab => {
    tab.tabs.forEach((tab) => {
      // @ts-ignore
      if (tab?.input?.uri?.path) {
        // @ts-ignore
        const filePath = tab.input.uri.path;
        if (isFileInAllWorkspaceRoot(filePath, allWorkspaceRoot)) {
          openedFiles.push(filePath);
        }
      }
    });
  });

  console.log('getOpenedFiles', openedFiles);

  return openedFiles;
}


export function sendUpdateOpenedFiles(filePath: string) {
  getSocketWithFilePath(filePath)?.sendOpenedFiles();
}