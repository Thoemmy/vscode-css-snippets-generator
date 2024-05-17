#! /usr/bin/env node
const { program } = require("commander");
const main = require("./src/main");

program
  .description("Generate VSCode snippets from scss files")
  .requiredOption("-d, --directory <folder>", "Input Folder")
  .option(
    "-s, --scope <scope>",
    "Which scope does the snippet have? html,css e.g."
  )
  .option("-o, --output <filename>", "Output Filename")
  .parse(process.argv);

const options = program.opts();

const directory = options.directory;
const outputFilename = options.output;
const scope = options.scope;

main(directory, outputFilename, scope);
