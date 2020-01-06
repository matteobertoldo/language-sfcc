## 0.2.2 - 2020-01-06

### Fixed

-   Fixed [#6](https://github.com/matteobertoldo/language-sfcc/issues/6): **&#91;ISML&#93;** highlight color in the isscript tag.

## 0.2.1 - 2020-01-04

### Changed

-   Once called, all snippets are completed with automatic selection to modify the default attributes.
-   All attributes have been optimized based on whether they can be: `strings` or `expressions`. According to official [documentation](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/ISML/ISML.html).
-   Improved _README_ documentation.

### Fixed

-   Fixed [#3](https://github.com/matteobertoldo/language-sfcc/issues/3): **&#91;ISML&#93;** check on attributes of each server tags.

## 0.2.0 - 2019-12-25

### Added

-   All server tags are highlight now with `section.embedded` default grammar color.
-   Added missing snippet for `<iscookie />` tag.

### Changed

-   Refactoring and separation of server tags into groups (`#tags` grammatical repository) with the possibility of inserting identical attributes to the `html` syntax. Now the separation when activating the `Scopes at Cursor` is between tags with:
    -   inline closing (`meta.tag.inline-with-attributes.isml`).
    -   blocking (`meta.tag.block-with-attributes.isml`).

### Removed

-   Removed unecessary `interface` folder inside `spec` test suite.

## 0.1.0 - 2019-12-23

### Added

-   Init Commit
-   The Package can now highlighting with custom Atom grammar the: `.isml` &amp; `.ds` (Demandware Script) files, provide completions and snippets.
-   The description for autocomplete **ISML** tags are grabbed from the official Salesforce Commerce Cloud B2C [documentation](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/ISML/ISML.html).
-   Added directive for `importPackage` & `importScript` in Demandware Script grammar as highlight `import` default `es6` statement.
