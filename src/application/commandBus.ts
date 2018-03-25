import { loadConfigurationFromPath } from 'tslint/lib/configuration';
import { Application } from 'hollywood-js';
import { log } from 'util';

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