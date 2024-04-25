var fs = require("fs");
var path = require("path");

function readFiles(directory) {
  var files = fs.readdirSync(directory);
  return files.filter(function (file) {
    return file.endsWith(".scss") || file.endsWith(".css");
  });
}

function analyzeClasses(fileContent) {
  var classPattern = /\.([a-zA-Z0-9_-]+)/g;
  var classNames = [];
  var match;
  while ((match = classPattern.exec(fileContent)) !== null) {
    classNames.push(match[1]);
  }
  return classNames;
}

function generateObject(classes) {
  var generatedObject = {};
  classes.forEach(function (className) {
    var classObject = {
      scope: "html",
      prefix: className,
      body: [className],
      description: className,
    };
    generatedObject[className] = classObject;
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

function main() {
  const filename = process.argv[3];
  const directory = process.argv[2];
  var files = readFiles(directory);
  var allClasses = [];
  var fileContent;
  files.forEach(function (file) {
    var filePath = path.join(process.cwd(), directory, file);
    fileContent = fs.readFileSync(filePath, "utf-8");
    var classes = analyzeClasses(fileContent);
    allClasses.push.apply(allClasses, classes);
  });
  var generatedObject = generateObject(allClasses);
  createCodeSnippetsFile(directory, filename, generatedObject);
}

main();
