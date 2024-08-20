import { yarg as argv } from "./config/plugins/args.plugins";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv)

// console.log(argv.b)

(async () => {
    await main();
})();

async function main() {
    

    const {b: base, l: limit, s: showTable, n: name, d: destination } = argv;

    ServerApp.run({ base, limit, showTable, name, destination })
}