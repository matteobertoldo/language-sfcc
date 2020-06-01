# Language SFCC

<img
    alt="Atom SFCC"
    width="190px"
    src="https://raw.githubusercontent.com/matteobertoldo/language-sfcc/assets/ui/atom-sfcc.svg?sanitize=true"
/>

[![macOS/Linux Build Status](https://travis-ci.org/matteobertoldo/language-sfcc.svg?branch=master)](https://travis-ci.org/matteobertoldo/language-sfcc) [![Windows Build status](https://ci.appveyor.com/api/projects/status/bxsl40wyjcuxaa2g?svg=true)](https://ci.appveyor.com/project/matteobertoldo/language-sfcc) [![Dependencies Status](https://david-dm.org/matteobertoldo/language-sfcc/status.svg)](https://david-dm.org/matteobertoldo/language-sfcc)

Adds syntax highlighting, completions, and snippets to `.isml` &amp; `.ds` (Demandware Script) files in [Atom](https://atom.io). <br>
With support for [_Autocomplete+_](https://github.com/atom/autocomplete-plus) &amp; [Hyperclick](https://github.com/facebookarchive/atom-ide-ui/tree/master/modules/atom-ide-ui/pkg/hyperclick) already included.

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

The description for autocomplete `.isml` tags are grabbed from the official Salesforce Commerce Cloud B2C [_documentation_](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/ISML/ISML.html). In order to properly consult the official guide, you must be a _**Salesforce Developer registered**_ in an instance of your sandbox or in a Commerce Cloud B2C development environment.

### Tags

The autocompletion of the tags respects the _**semantics**_, for the correct functionality of the tags in the **SFCC** environment.
Look at this example of spacing of the `<isreplace/>` tag. The highlight of the tag color helps you understand if the type is wrong.

![isreplace-snippet](https://user-images.githubusercontent.com/15775323/74118089-431a0380-4bba-11ea-9f6a-7df6b7e72129.gif)

### Snippets

Once the package is installed, all the snippets available for the various tag servers are available in the section: **Snippets**. <br>
By default, any completion of any tag server can be called without the <kbd>is</kbd> extension.

> _Example_: if you type `include` become:

```html
<isinclude template="common/layout/page" />
```

### Autocomplete+

Support for **_autocomplete+_** is already included in the package. <br>
At each insertion of the opening of each tag, typing therefore: <kbd>&lt;</kbd>, all available server-side tags are shown.

For each tag, in turn, all it's available attributes are self-completed. Before you can close each tag the package helps you understand which type of closure to respect for each tag, thus avoiding syntax errors.

![isml-completions](https://user-images.githubusercontent.com/15775323/74117784-1c0f0200-4bb9-11ea-8fac-786e5d5acaf5.gif)

In addition to suggesting if the tag has attributes or not to insert, the typologies of suggestion, already explanatory for their name while writing the tag, can be:

-   `Block Closing With Attr(s)`
-   `Block Closing Without Attrs`
-   `Self Closing With Attr(s)`
-   `Self Closing Without Attrs`

## Hyperclick

It's possible to open the templates included in the `template` attribute in the tags:

-   `<isdecorate/>`
-   `<isinclude/>`
-   `<ismodule/>`

Here is an example of automatically opening the templates with Hyperclick interaction.
In `macOS` the automatic trigger of the underline can be activated with the combination of the default keys <kbd>cmd + click</kbd>, and in other platforms with: <kbd>control + click</kbd>.

![hero-hyperclick](https://user-images.githubusercontent.com/15775323/83434621-1cb6f700-a43b-11ea-8572-ebe27c51894a.gif)

In order to enable Hyperclick support, the installation of [`atom-ide-ui`](https://atom.io/packages/atom-ide-ui) is required. Once installed `language-sfcc` you will be asked _optionally_ whether or not to activate this feature.

## Grammar

By default the ISML syntax includes the default scope for HTML files (`text.html.basic`), so many of the packages that work for the `.html` extension also work in the `.isml` files. For example, the extension for [automatic closing](https://atom.io/packages/autoclose-html-plus) of tags.

### Syntax

The package supports, compared to other extensions for the various editors, **full highlight syntax** between the `html` and `isml` tags. Even in complex situations. Here is an example.

![syntax-preview](https://user-images.githubusercontent.com/15775323/74107063-9a918280-4b6c-11ea-8f1b-df9479cd6910.png)

### Validate ISML

Each `.isml` files can be parsed with the [`htmlhint`](https://github.com/htmlhint/HTMLHint) plugin, configurable by `.htmlhintrc` file. <br>
Follow [this guide](https://github.com/matteobertoldo/language-sfcc/wiki/Setup-for-parse-ISML-files-with-htmlhint) to be able to parse files correctly.

## License

Language SFCC is released under the [MIT](https://github.com/matteobertoldo/language-sfcc/blob/master/LICENSE) license.
