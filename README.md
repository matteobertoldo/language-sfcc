<h1>
    Language SFCC
    <img
        width="190px"
        src="https://raw.githubusercontent.com/matteobertoldo/language-sfcc/assets/ui/atom-sfcc.svg?sanitize=true"
        alt="Atom SFCC"
    />
</h1>

[![macOS/Linux Build Status](https://travis-ci.org/matteobertoldo/language-sfcc.svg?branch=master)](https://travis-ci.org/matteobertoldo/language-sfcc) [![Windows Build status](https://ci.appveyor.com/api/projects/status/bxsl40wyjcuxaa2g?svg=true)](https://ci.appveyor.com/project/matteobertoldo/language-sfcc) [![Dependencies Status](https://david-dm.org/matteobertoldo/language-sfcc/status.svg)](https://david-dm.org/matteobertoldo/language-sfcc)

Adds syntax highlighting, completions, and snippets to `.isml` &amp; `.ds` (Demandware Script) files in [Atom](https://atom.io).

## Installation

### Command Line

1.  Install the latest version of [Atom](https://atom.io)
2.  In the terminal, install the package via **apm**:

```sh
apm install language-sfcc
```

### GUI

1.  Install the latest version of [Atom](https://atom.io)
2.  Launch Atom
3.  Open Settings View using <kbd>Cmd+,</kbd> on macOS or <kbd>Ctrl+,</kbd> on other platforms
4.  Click the Install tab on the left side
5.  Enter `language-sfcc` in the search box and press <kbd>Enter</kbd>
6.  Click the "Install" button that appears

## Autocomplete

The description for autocomplete **ISML** tags are grabbed from the official Salesforce Commerce Cloud B2C [documentation](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/ISML/ISML.html).

### Tags

The autocompletion of the tags respects the _**semantics**_, for the correct functionality of the tags in the **SFCC** environment.
Look at this example of spacing of the `<isreplace/>` tag. The highlight of the tag color helps you understand if the type is wrong.

![hero type tags](https://user-images.githubusercontent.com/15775323/71999128-2304c680-3241-11ea-9f6e-379f462587aa.gif)

### Snippets

Once the package is installed, all the snippets available for the various tag servers are available in the section: **Snippets**. <br /> By default, any completion of any tag server can be called without the <kbd>is</kbd> extension.

> _Example_: if you type `include` become:

```html
<isinclude template="common/layout/page" />
```

### Autocomplete+

Support for **autocomplete+** is already included in the package. At each insertion of the opening of each tag, typing therefore: `<`, all available server-side tags are shown.

For each tag, in turn, all it's available attributes are self-completed. Here is an example.

![html-completions](https://cloud.githubusercontent.com/assets/2766036/25668197/ffd24928-2ff3-11e7-85fc-b327ac2287e6.gif)

## Grammar

By default the ISML syntax includes the default scope for HTML files (`text.html.basic`), so many of the packages that work for the `.html` extension also work in the `.isml` files. For example, the extension for [automatic closing](https://atom.io/packages/autoclose-html-plus) of tags.

### Syntax

The package supports, compared to other extensions for the various editors, **full highlight syntax** between the `html` and `isml` tags. Even in complex situations. Here is an example.

![hero ld+json](https://user-images.githubusercontent.com/15775323/72209745-07ecbd80-34b2-11ea-891c-82d01571c4b8.png)

### Parsing Files?

Each `.isml` file can be parsed with the [`htmlhint`](https://github.com/htmlhint/HTMLHint) tool. Follow [this](https://github.com/matteobertoldo/language-sfcc/wiki/Setup-for-parse-ISML-files-with-htmlhint) guide to be able to parse files correctly.

## License

Language SFCC is released under the [MIT](https://github.com/matteobertoldo/language-sfcc/blob/master/LICENSE) license.
