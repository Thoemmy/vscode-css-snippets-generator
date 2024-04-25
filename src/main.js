var fs = require("fs");
var path = require("path");

function readFiles(directory) {
  var files = fs.readdirSync(directory);
  return files.filter(function (file) {
    return file.endsWith(".scss") || file.endsWith(".css");
  });
}

function parseCSS(css) {
  var classRegex = /\.([^\s{]+)/g;
  var lines = css.split("\n");
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

      // Find CSS properties and values
      var classContent = css.substring(
        css.indexOf(match[0]),
        css.indexOf("}", css.indexOf(match[0])) + 1
      );
      var cssRegex = /\{([^}]*)\}/;
      var cssMatch = cssRegex.exec(classContent);
      classObj.css = cssMatch ? cssMatch[1].trim() : "";

      classes.push(classObj);
    }
  });

  return classes;
}

function generateObject(allParsed, scope) {
  var generatedObject = {};
  allParsed.forEach(function (item) {
    var classObject = {
      scope: scope || "html",
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
    console.log(file);
    var fileName = file.split(".")[0];
    var filePath = path.join(process.cwd(), directory, file);
    fileContent = fs.readFileSync(filePath, "utf-8");
    parsedObj = parseCSS(fileContent);
    allParsed.push.apply(allParsed, parsedObj);
    generatedObject = generateObject(allParsed, scope);
    createCodeSnippetsFile(
      directory,
      outputFilename ? outputFilename + `_${Date.now()}` : fileName,
      generatedObject
    );
  });
}

// Beispiel CSS-Code mit mehreren Klassen und Kommentaren
var css = `// This class is used for Headers
.od-test-xl {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
}

// This class is used for paragraphs
.od-test-sm {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
}

// Base class is used for other stuff
.od-test-base {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
}

// Can be used for quotes
.od-test-xs {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
}

// Is used for headers too
.od-test-lg {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
}`;

//var result = parseCSS(css);
//console.log(result);

module.exports = main;
