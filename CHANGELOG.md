## 0.5.1 - 2020-08-01

### Added

-   Added highlighting for `dw.svc` (supported until version `19.10`) base class of Service Definitions.

### Changed

-   Updated small configurations &amp; `dependencies` to latest version.

## 0.5.0 - 2020-06-01

### Added

-   Added support for Hyperclick UI [#12](https://github.com/matteobertoldo/language-sfcc/issues/12).
-   Added new provider to be able to quickly open the paths included in the `template` attribute in the tags: `<isdecorate/>` `<isinclude/>` `<ismodule/>`

## 0.4.0 - 2020-02-09

### Added

-   Added support for Autocomplete&plus; [#10](https://github.com/matteobertoldo/language-sfcc/issues/10).
-   Added new `descriptions` of each server tag.
-   Added auto-completion of each `attribute` for each individual tag.
-   Added specific `url` to official Salesforce documentation for every single tag.

### Changed

-   Disabled all `conditional` snippets
    -   (`else`, `elseif`, `if`, `ife`) in `meta.tag` scope.

### Removed

-   Removed `description` in all snippets in favor of Autocomplete+.

## 0.3.0 - 2020-01-07

### Changed

-   Changed minor version for `apm` service.

### Removed

-   Removed `assets` folder.

## 0.2.2 - 2020-01-06

### Fixed

-   Fixed [#6](https://github.com/matteobertoldo/language-sfcc/issues/6): &#91;ISML&#93; highlight color in the isscript tag.

## 0.2.1 - 2020-01-04

### Changed

-   Once called, all snippets are completed with automatic selection to modify the default attributes.
-   All attributes have been optimized based on whether they can be: `strings` or `expressions`. According to official [documentation](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/ISML/ISML.html).
-   Improved _README_ documentation.

### Fixed

-   Fixed [#3](https://github.com/matteobertoldo/language-sfcc/issues/3): &#91;ISML&#93; check on attributes of each server tags.

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
