import * as vscode from 'vscode';
import { sendUpdateBreakpoints } from "../apis/breakpoints";

export let onBreakpointUpdate = vscode.debug.onDidChangeBreakpoints(event => {

  console.log('onBreakpointUpdate', event);
  const filePaths: string[] = [];

  event.added.forEach(bp => {
    // @ts-ignore
    if (bp.location) {
      // @ts-ignore
      filePaths.push(bp.location.uri.path);
    }
  });

  event.removed.forEach(bp => {
    // @ts-ignore
    if (bp.location) {
      // @ts-ignore
      filePaths.push(bp.location.uri.path);
    }
  });


  event.changed.forEach(bp => {
    // @ts-ignore
    if (bp.location) {
      // @ts-ignore
      filePaths.push(bp.location.uri.path);
    }
  });

  filePaths.forEach(fPath => {
    sendUpdateBreakpoints(fPath);
  });
});