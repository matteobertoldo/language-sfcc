'use babel';

import * as deps from 'atom-package-deps';
import getSuggestionsWithTextMate from './text-mate-provider';
import TemplateProvider from './template-path-provider';
import IsmlLinter from 'isml-linter';
import { getDiagnosticsList } from './utils';

// global grammar scope
const SCOPE = ['text.html.isml'];

export default {
  subscriptions: null,
  activate() {
    deps.install('language-sfcc', true).then(() => {});
  },
  getProvider() {
    const templateProvider = new TemplateProvider();
    return {
      selector: '.text.html.isml',
      grammarScopes: SCOPE,
      disableForSelector: '.text.html.isml .comment, .text.html.isml .embedded',
      priority: 1,
      filterSuggestions: true,
      getSuggestions(request) {
        return getSuggestionsWithTextMate(request);
      },
      async getSuggestionForWord(editor, text, range) {
        const { attributeRange, filePaths } = templateProvider.getRange(editor, range);

        if (attributeRange && filePaths) {
          let template;
          let callback = [];

          try {
            template = await templateProvider.getFilePaths(filePaths);

            if (Array.isArray(template)) {
              template.map((files) => {
                return callback.push({
                  title: files,
                  callback: () => {
                    atom.workspace.open(files);
                  }
                });
              });
            } else {
              callback = () => {
                !template ? templateProvider.notifywarn() : atom.workspace.open(template);
              };
            }
          } catch (err) {
            callback = () => {
              templateProvider.notifyerr(err);
            };
          }

          return {
            range: attributeRange,
            callback
          };
        }
      },
      onDidInsertSuggestion({ editor, suggestion }) {
        if (suggestion.type === 'attribute') {
          setTimeout(this.triggerAutocomplete.bind(this, editor), 1);
        }
      },
      triggerAutocomplete(editor) {
        atom.commands.dispatch(editor.getElement(), 'autocomplete-plus:activate', { activatedManually: false });
      }
    };
  },
  provideLinter() {
    return {
      name: 'ismlhint',
      grammarScopes: SCOPE,
      scope: 'file',
      lintsOnChange: true,
      lint: (editor) => {
        if (!atom.workspace.isTextEditor(editor)) {
          return null;
        }

        const filePath = editor.getPath();
        if (!filePath) {
          return null;
        }

        const fileText = editor.getText();
        if (!fileText) {
          return [];
        }

        if (editor.getText() !== fileText) {
          return null;
        }

        const linter = IsmlLinter.parse(filePath, fileText);
        const info = getDiagnosticsList(linter.info, filePath, editor);
        const warnings = getDiagnosticsList(linter.warnings, filePath, editor);
        const errors = getDiagnosticsList(linter.errors, filePath, editor);

        return [...info, ...warnings, ...errors];
      }
    };
  }
};
