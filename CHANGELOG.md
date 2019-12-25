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
