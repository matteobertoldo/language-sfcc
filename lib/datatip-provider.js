'use babel';

// https://github.com/facebookarchive/atom-ide-ui/blob/master/docs/datatips.md
export default class DatatipProvider {
  constructor() {
    return {
      providerName: 'isml-datatip',
      priority: 1,
      grammarScopes: ['text.html.isml'],
      datatip: (editor, position) => {
        const { log } = console;
        log(editor, position);
      }
    };
  }
}
