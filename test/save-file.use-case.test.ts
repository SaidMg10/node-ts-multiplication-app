import { SaveFile } from '../src/domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {
    
    const customOptions = {
        fileContent: 'custom content',
        destination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    };

    const customFilePath = `${customOptions.destination}/${customOptions.fileName}.txt`;


    // beforeEach(() => {
    //    jest.clearAllMocks();
    // })

    afterEach(() => {

        const outputFolderExists = fs.existsSync( 'outputs' );
        if( outputFolderExists ) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync( customOptions.destination );
        if( customOutputFolderExists ) fs.rmSync( 'custom-outputs', { recursive: true });

    });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        };

        const result = saveFile.execute( options );
        const fileExist = fs.existsSync( filePath )
        const fileContent = fs.readFileSync( filePath, { encoding: 'utf-8' } );
        
        expect( result ).toBeTruthy();
        expect( fileExist ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );


    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();
        

        const result = saveFile.execute( customOptions );
        const fileExists = fs.existsSync( customFilePath );
        const fileContent = fs.readFileSync( customFilePath, { encoding: 'utf-8' });

        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn( fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom message from testing'); }
        );

        const result = saveFile.execute(customOptions);

        expect( result ).toBe( false );

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSync = jest.spyOn( fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message'); }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe( false );

        writeFileSync.mockRestore();

    });

});