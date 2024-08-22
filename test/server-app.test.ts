import { exec } from 'child_process';
import { ServerApp } from '../src/presentation/server-app';
import { CreateTable } from '../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../src/domain/use-cases/save-file.use-case';





describe('Server App', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: true,
        destination: 'test-destination',
        name: 'test-fileName'
    };

    test('should create ServerApp instance', () => {
        
        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run ).toBe('function');
    });


    test('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );


        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes(3);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenLastCalledWith('File created!');

        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({ 
            base: options.base, limit: options.limit
        });
        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destination: options.destination, 
            fileName: options.name,
        });
    });


    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 1 = 1');
        const saveFileMock = jest.fn().mockReturnValue(false);


        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;


        ServerApp.run(options);

        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createMock ).toHaveBeenCalledWith({
            "base": options.base, "limit": options.limit 
        });
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: '1 x 1 = 1',
            destination: options.destination,
            fileName: options.name,
        });
        // expect( logMock ).toHaveBeenCalledWith('File created!');
        expect( logErrorMock ).not.toHaveBeenCalledWith();
    })

});