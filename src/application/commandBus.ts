import { Application } from 'hollywood-js';

class CommandBus extends Application.Bus {

    handle(
        command: Application.ICommand, 
        successCallback?: (respnose: Application.AppResponse) => void,
        errorCallback?: (error: Application.AppError) => void

    ): void {
        super.handle(command, successCallback, errorCallback);
    }
}

export default CommandBus;
