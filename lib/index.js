'use babel';

import * as deps from 'atom-package-deps';
import getSuggestionsWithTextMate from './text-mate-provider';
import TemplateProvider from './template-path-provider';
import IsmlLinter from 'isml-linter';
import { getIsmlLinterConfig, getDiagnosticsList, createConfigFile } from './utils';

// global grammar scope
const SCOPE = ['text.html.isml'];

export default {
  subscriptions: null,
  activate() {
    deps.install('language-sfcc', true).then(() => {});
  },
  config: {
    linterOptions: {
      title: 'ISML Linter',
      description:
        "Changes to the following options take effect each time the `ISML Linter` is executed. \n \n It's necessary reopen a file for parse it correctly.",
      type: 'object',
      order: 1,
      properties: {
        noConfigFile: {
          title: 'Disable when no ISML Linter config is found',
          type: 'boolean',
          default: false,
          order: 1
        }
      }
    }
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
      name: 'isml-linter',
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

        const config = getIsmlLinterConfig();
        if (!config && atom.config.get('language-sfcc.linterOptions.noConfigFile')) {
          return null;
        }

        if (!config) {
          const notification = atom.notifications.addWarning('ISML Linter: No config file found', {
            description: 'Error while executing `ISML Linter` process.',
            dismissable: true,
            buttons: [
              {
                text: 'Create a new config file',
                onDidClick: () => {
                  createConfigFile(atom.project.getPaths()[0]);
                  notification.dismiss();
                }
              },
              {
                text: 'Cancel',
                onDidClick: () => {
                  notification.dismiss();
                }
              }
            ]
          });

          return [];
        }

        const linter = IsmlLinter.parse(filePath, fileText, config);
        const errors = getDiagnosticsList(linter.errors, filePath, editor);
        const warnings = getDiagnosticsList(linter.warnings, filePath, editor);
        const info = getDiagnosticsList(linter.info, filePath, editor);

        return [...errors, ...warnings, ...info];
      }
    };
  }
};
