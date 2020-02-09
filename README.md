# Language SFCC

<img
    alt="Atom SFCC"
    width="190px"
    src="https://raw.githubusercontent.com/matteobertoldo/language-sfcc/assets/ui/atom-sfcc.svg?sanitize=true"
/>

[![macOS/Linux Build Status](https://travis-ci.org/matteobertoldo/language-sfcc.svg?branch=master)](https://travis-ci.org/matteobertoldo/language-sfcc) [![Windows Build status](https://ci.appveyor.com/api/projects/status/bxsl40wyjcuxaa2g?svg=true)](https://ci.appveyor.com/project/matteobertoldo/language-sfcc) [![Dependencies Status](https://david-dm.org/matteobertoldo/language-sfcc/status.svg)](https://david-dm.org/matteobertoldo/language-sfcc)

Adds syntax highlighting, completions, and snippets to `.isml` &amp; `.ds` (Demandware Script) files in [Atom](https://atom.io).\
With support for [_Autocomplete+_](https://github.com/atom/autocomplete-plus) already included.

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

The description for autocomplete `.isml` tags are grabbed from the official Salesforce Commerce Cloud B2C [documentation](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/ISML/ISML.html).

### Tags

The autocompletion of the tags respects the _**semantics**_, for the correct functionality of the tags in the **SFCC** environment.
Look at this example of spacing of the `<isreplace/>` tag. The highlight of the tag color helps you understand if the type is wrong.

![isreplace-snippet]()

### Snippets

Once the package is installed, all the snippets available for the various tag servers are available in the section: **Snippets**.\
By default, any completion of any tag server can be called without the <kbd>is</kbd> extension.

> _Example_: if you type `include` become:

```html
<isinclude template="common/layout/page" />
```

### Autocomplete+

Support for **_autocomplete+_** is already included in the package.\
At each insertion of the opening of each tag, typing therefore: <kbd>&lt;</kbd>, all available server-side tags are shown.

For each tag, in turn, all it's available attributes are self-completed. Before you can close each tag the package helps you understand which type of closure to respect for each tag, thus avoiding syntax errors.\

![isml-completions]()

In addition to suggesting if the tag has attributes or not to insert. The typologies of suggestion, already explanatory for their name while writing the tag, can be:

-   `Block Closing With Attr(s)`
-   `Block Closing Without Attrs`
-   `Self Closing With Attr(s)`
-   `Self Closing Without Attrs`

## Grammar

By default the ISML syntax includes the default scope for HTML files (`text.html.basic`), so many of the packages that work for the `.html` extension also work in the `.isml` files. For example, the extension for [automatic closing](https://atom.io/packages/autoclose-html-plus) of tags.

### Syntax

The package supports, compared to other extensions for the various editors, **full highlight syntax** between the `html` and `isml` tags. Even in complex situations. Here is an example.

![syntax-preview]()

### Validate ISML

Each `.isml` file can be parsed with the [`htmlhint`](https://github.com/htmlhint/HTMLHint) plugin, configurable by `.htmlhintrc` file.\
Follow [this](https://github.com/matteobertoldo/language-sfcc/wiki/Setup-for-parse-ISML-files-with-htmlhint) guide to be able to parse files correctly.

## License

Language SFCC is released under the [MIT](https://github.com/matteobertoldo/language-sfcc/blob/master/LICENSE) license.
