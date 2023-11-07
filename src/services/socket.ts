import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket, io } from "socket.io-client";
import { openFile } from "../apis/open-file";
import { getBreakpoints } from "../apis/breakpoints";
import { getOpenedFiles } from "../apis/opened-files";

export class SocketInstance {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(public port: number, public allWorkspaceRoot: string[]) {
    const serverUrl =
      'ws://localhost:' + this.port + '/ide';
    this.socket = io(serverUrl, this.opts());
    console.log('init socket ', serverUrl);
    this.init();
  }

  opts() {
    return {
      forceNew: true,
      multiplex: false,
      reconnection: true,
      transports: ['websocket'],
      reconnectionDelayMax: 1000,
      reconnectionDelay: 900,
      timeout: 2000,
      requestTimeout: 2000,
    };

  }

  init() {
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('event', this.onEvent.bind(this));
    this.socket.on('target-project', this.onTargetProject.bind(this));
    this.socket.on('open-file', this.onOpenFile.bind(this));

    this.sendUpdate();
  }

  onConnect() {
    console.log('socket connect');
    // this.socket.emit('hello', 'world');
  }

  onEvent(data: any) {
    console.log('evt');
  }

  onTargetProject(data: any) {
    console.log('onTargetProject');
    this.sendUpdate();
  }

  selectFile(workspaceRoot: string, filePath: string) {
    this.socket.emit('ev', {
      event: 'select-file',
      ideRoot: workspaceRoot,
      filePath:filePath
    });

  }

  sendUpdate() {
    console.log('send update');
    this.sendOpenedFiles();
    this.sendBreakpoints();
  }

  onOpenFile(filePath: string, line: number, column: number) {
    console.log('onOpenFile');
    if (filePath?.length >= 1) {
      openFile({filePath, line, column});
    }
  }

  sendBreakpoints() {
    this.socket.emit('breakpoints', this.allWorkspaceRoot, getBreakpoints(this.allWorkspaceRoot));
  }

  sendOpenedFiles() {
    this.socket.emit('opened-files', ...getOpenedFiles(this.allWorkspaceRoot));
  }


  close() {
    this.socket.off('connect', this.onConnect.bind(this));
    this.socket.off('event', this.onEvent.bind(this));
    this.socket.off('target-project', this.onTargetProject.bind(this));
    this.socket.off('open-file', this.onOpenFile.bind(this));
    this.socket.close();
  }
}

