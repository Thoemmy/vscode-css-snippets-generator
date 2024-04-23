# snippets-generator

Creates snippets for css classes which then can be used to envolve your intelllisense in VSCode

To use the generator type following in your cli
`node main.js <PathToFile> <FileName>`

this will go through the directory which is set by first argument and will select only css or scss files.

the filename will be your set filename as second argument with the additionally added `yourFileName.extension.code-snippets`
