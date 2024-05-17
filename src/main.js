var fs = require("fs");
var path = require("path");

function readFiles(directory) {
  var files = fs.readdirSync(directory);
  return files.filter(function (file) {
    return file.endsWith(".scss");
  });
}

function parseCSS(content) {
  var classRegex = /\.([^\s{]+)/g; // to detect following string -> .test-class
  var lines = content.split("\n");
  var classes = [];
  lines.forEach(function (line, index) {
    var match = classRegex.exec(line);
    if (match) {
      var className = match[1];
      var classObj = {
        class: className,
        css: "",
        description: "",
      };

      // Check if previous line is a comment
      if (index > 0 && lines[index - 1].trim().startsWith("//")) {
        classObj.description = lines[index - 1].trim().substring(2).trim();
      }

      // Find SCSS properties and values
      var classContent = content.substring(
        content.indexOf(match[0]),
        content.indexOf("}", content.indexOf(match[0])) + 1
      );
      var cssRegex = /\{([^}]*)\}/; // to detect content of class which is between {...}
      var cssMatch = cssRegex.exec(classContent);
      classObj.css = cssMatch ? cssMatch[1].trim() : "";

      classes.push(classObj);
    }
  });

  return classes;
}

function generateObject(allParsed) {
  var generatedObject = {};
  allParsed.forEach(function (item) {
    var classObject = {
      scope: "html",
      prefix: item.class,
      body: [item.class],
      description: item.description,
    };
    generatedObject[item.css] = classObject;
  });
  return generatedObject;
}

function createCodeSnippetsFile(directory, filename, generatedObject) {
  const filePath = `${directory}/${filename}.extension.code-snippets`;
  const content = JSON.stringify(generatedObject, null, 2);

  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Fehler beim Schreiben der Datei:", err);
    } else {
      console.log(`Die Datei ${filePath} wurde erfolgreich erstellt.`);
    }
  });
}

function main(directory, outputFilename, scope) {
  var files = readFiles(directory);
  var fileContent;
  var parsedObj;
  var allParsed = [];
  var generatedObject;
  files.forEach(function (file) {
    var fileName = file.split(".");
    var filePath = path.join(process.cwd(), directory, file);
    fileContent = fs.readFileSync(filePath, "utf-8");
    parsedObj = parseCSS(fileContent);
    allParsed.push.apply(allParsed, parsedObj);
    generatedObject = generateObject(allParsed);
    createCodeSnippetsFile(
      directory,
      outputFilename ? outputFilename + `_${Date.now()}` : fileName[0],
      generatedObject
    );
    allParsed = [];
  });
}

module.exports = main;
