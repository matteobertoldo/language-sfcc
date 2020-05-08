'use babel';

import * as deps from 'atom-package-deps';
import getSuggestionsWithTextMate from './text-mate-provider';
import TemplateProvider from './template-path-provider';

// https://github.com/atom/autocomplete-plus/wiki/Provider-API
const provider = {
    selector: '.text.html.isml',
    grammarScopes: ['text.html.isml'],
    disableForSelector: '.text.html.isml .comment, .text.html.isml .embedded',
    priority: 1,
    filterSuggestions: true,
    getSuggestions(request) {
        return getSuggestionsWithTextMate(request);
    },
    getSuggestionForWord(editor, text, range) {
        const templateProvider = new TemplateProvider();
        const { attributeRange, filePaths } = templateProvider.getRange(editor, range);

        if (attributeRange && filePaths) {
            return {
                range: attributeRange,
                callback() {
                    templateProvider.getFilePaths(editor.getPath(), filePaths);
                }
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
    activate() {
        deps.install('language-sfcc', true).then(() => {});
    },
    getProvider() {
        return provider;
    }
};
