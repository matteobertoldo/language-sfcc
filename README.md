<img
    width="260px"
    src="https://raw.githubusercontent.com/matteobertoldo/language-sfcc/master/assets/atom-sfcc.svg?sanitize=true"
    alt="Atom SFCC"
/>

<hr />

[![macOS/Linux Build Status](https://travis-ci.org/matteobertoldo/language-sfcc.svg?branch=master)](https://travis-ci.org/matteobertoldo/language-sfcc) [![Windows Build status](https://ci.appveyor.com/api/projects/status/bxsl40wyjcuxaa2g?svg=true)](https://ci.appveyor.com/project/matteobertoldo/language-sfcc) [![Dependencies Status](https://david-dm.org/matteobertoldo/language-sfcc/status.svg)](https://david-dm.org/matteobertoldo/language-sfcc)

Adds syntax highlighting, completions, and snippets to `.isml` &amp; `.ds` (Demandware Script) files in [Atom](https://atom.io).

## Installation (Soon)

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

### Snippets

Once the package is installed, all the snippets available for the various tag servers are available in the section: **Snippets**. <br /> By default, any completion of any tag server can be called without the <kbd>is</kbd> extension.

> _Example_: if you type `include` become:

```html
<isinclude template="common/layout/page" />
```

## Grammar

By default the ISML syntax includes the default scope for HTML files (`text.html.basic`), so many of the packages that work for the `.html` extension also work in the `.isml` files. For example, the extension for [automatic closing](https://atom.io/packages/autoclose-html-plus) of tags.

### Syntax

The package supports, compared to other extensions for the various editors, **full highlight syntax** between the `html` and `isml` tags. Even in complex situations. Here is an example.

<img
    style="border-radius: 6px; max-width: 756px; width: 100%;"
    src="https://raw.githubusercontent.com/matteobertoldo/language-sfcc/master/assets/hero-ld%2Bjson__loop.png"
    alt="hero ld+json"
/>

## License

Language SFCC is released under the [MIT](https://github.com/matteobertoldo/language-sfcc/blob/master/LICENSE) license.
