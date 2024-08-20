import fs from "fs";


// export const header: string = `==================
// Tabla del 5
// ==================\n`;

// export const multFive = async () => {
//     const mult: number = 5;
//     let content = header;

//     for (let i = 1; i <= 10; i++) {
//         let res = mult * i;
//         content += `${mult} x ${i} = ${res}\n`;
//     }

//     try {
//         await writeFile('tabla_del_5.txt', content);
//         console.log('Tabla guardada en tabla_del_5.txt');
//     } catch (error) {
//         console.error('Error al guardar la tabla:', error);
//     }
// };

let outputMessage = ''
const base = 5
const headerMessage = `
==================
Tabla del ${base}
==================
`;

for( let i = 1; i<=10; i++){
    outputMessage += `${ base } x ${ i } = ${ base * i }\n`;
}

outputMessage = headerMessage + outputMessage
console.log(outputMessage)

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log('File created!')