import * as vscode from 'vscode';
import { FileCursor } from "../extension";
import { getSocketWithFilePath } from "../services/socket-manager";
import { isFileInAllWorkspaceRoot } from "./project";


export function getBreakpoints(allWorkspaceRoot: string[]) {
  const breakpoints = vscode.debug.breakpoints;
  let bpsArrayy: FileCursor[] = [];

  breakpoints.forEach((breakpoint) => {
    if (breakpoint instanceof vscode.SourceBreakpoint) {
      if (isFileInAllWorkspaceRoot(breakpoint.location.uri.path, allWorkspaceRoot)) {
        const filePath = breakpoint.location.uri.path;
        const line = breakpoint.location.range.start.line + 1;
        const column = breakpoint.location.range.start.character;
        bpsArrayy.push({filePath, line, column});
      }
    }
  });

  console.log('getBreakpoints', bpsArrayy);
  return bpsArrayy;
}


export function sendUpdateBreakpoints(filePath: string) {
  console.log('sendUpdateBreakpoints');
  getSocketWithFilePath(filePath)?.sendBreakpoints();
}