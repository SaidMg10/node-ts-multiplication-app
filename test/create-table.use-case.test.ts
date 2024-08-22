
import { CreateTable } from '../src/domain/use-cases/create-table.use-case';




describe ('CreateTableUseCase', () => {
    test('should create table with the default values', () => {

        const createTable = new CreateTable();

        const table = createTable.execute({ base: 5 });

        const rows = table.split('\n').length;

        expect( createTable ).toBeInstanceOf( CreateTable );

        expect( table ).toContain('5 x 1 = 5')
        expect( table ).toContain('5 x 10 = 50')
        expect( rows ).toBe(10)

    });

    test('should create table with custom values', () => {

        const options = {
            base: 3,
            limit: 20
        };

        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const rows = table.split('\n').length;
        const allLinesContainBase = table.split('\n').every(line => line.startsWith(`${options.base} x`));


        console.log( table );

        expect( table ).toContain( '3 x 1 = 3' );
        expect( table ).toContain( '3 x 10 = 30' );
        expect( table ).toContain( '3 x 20 = 60' );
        expect( rows ).toBe( options.limit );
        expect ( allLinesContainBase ).toBe( true );

    })

});

