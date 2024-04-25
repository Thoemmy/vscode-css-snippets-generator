#! /usr/bin/env node
const { program } = require("commander");
const main = require("./src/main");

program
  .description("Generate VSCode snippets from css or scss files")
  .requiredOption("-d, --directory <filename>", "Eingabedatei")
  .option(
    "-s, --scope <scope>",
    "Which scope does the snippet have? html,css e.g."
  )
  .option("-o, --output <filename>", "Ausgabedatei")
  .parse(process.argv);

const options = program.opts();

const directory = options.directory;
const outputFilename = options.output;
const scope = options.scope;

//console.log(directory);
//console.log(outputFilename);

main(directory, outputFilename, scope);
