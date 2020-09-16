'use babel';

import * as deps from 'atom-package-deps';
import getSuggestionsWithTextMate from './text-mate-provider';
import TemplateProvider from './template-path-provider';

// providers
const templateProvider = new TemplateProvider();

const provider = {
  selector: '.text.html.isml',
  grammarScopes: ['text.html.isml'],
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
            callback.push({
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

export default {
  subscriptions: null,
  activate() {
    deps.install('language-sfcc', true).then(() => {});
  },
  getProvider() {
    return provider;
  }
};
