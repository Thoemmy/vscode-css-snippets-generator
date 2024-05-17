# simple scss snippets-generator

Creates snippets for scss classes which then can be used to envolve your intelllisense in VSCode

This generator will only create vscode snippets for html purposes.

Install the package and run following command `snipgen -d <directory> -o <ouputName>` or `snipgen --directory /apps/code --output test`

The output name is optional, if not set the original scss name will be used.
If the output is set, the file additionally will get a timestamp to the defined name so that it is unique.

Filename = `<filename or custom name>.extension.code-snippets`

The file is stored in the same folder as the SCSS file.

The SCSS files should be structured as follows, otherwise the script will not work as expected ^^
Deeply nested SCSS files are not yet supported xD

### Example

#### DO

```scss
//style.css

// Here you can add a one line description of the class
.some-class-name {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
}
// Awesome background and color
.next-class-name {
  color: black;
  background-color: white;
}
```

#### DONT

```scss
// Here you can add a one line description of the class
.some-class-name {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;

  // Awesome background and color
  .next-class-name {
    color: black;
    background-color: white;
  }
}
```

now run the command `snipgen -d ./scss -o our-example`

The output will be as follows:

```json
//our-example.extension.code-snippets

{
  "line-height: 24px;\n  font-size: 16px;\n  font-weight: 500;": {
    "scope": "html",
    "prefix": "some-class-name",
    "body": ["some-class-name"],
    "description": "Here you can add a one line description of the class"
  },
  "color: black;\n  background-color: white;": {
    "scope": "html",
    "prefix": "next-class-name",
    "body": ["next-class-name"],
    "description": "Awesome background and color"
  }
}
```

Once you have received the file(s), move it to the `.vscode` folder (in the root directory of the project) and you are ready to go.

In our case we will move the file called: `our-example.extension.code-snippets` into the `.vscode` folder

After that you should be able to use the new generated snippets in your html files.

```html
<div class="some-class-name"></div>
```
