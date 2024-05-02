# simple css/scss snippets-generator

Creates snippets for css classes which then can be used to envolve your intelllisense in VSCode

Install the package and run following command `snipgen -f <directory> -o <ouputName> -s <scope of snippet>`

the scope of the snippet can be html, css or other supportet languages with snippet support in vscode.

The output name is optional, if not set the original css name will be used.
If the output is set, the file additionally will get a timestamp to the defined name so that it is unique.

Filename = `<filename or custom name>.extension.code-snippets`

File will be put out in the same folder as the css or scss is located.

The css files should be strucured as following otherwise the script is not working ^^
No deep structured css are supported, yet xD

```css
// Here you can add a one line description of the class
.some-class-name {
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
}
```

now run the command `snipgen -f ./css -s html``

the output will be following:

```json
{
  "line-height: 24px;\n  font-size: 16px;\n  font-weight: 500;": {
    "scope": "html",
    "prefix": "some-class-name",
    "body": [
      "some-class-name"
    ],
    "description": "Here you can add a one line description of the class"
  },
  ...
}
```
