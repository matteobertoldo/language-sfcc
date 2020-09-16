'use babel';

import { getTagNameCompletions, getAttributeNameCompletions, getAttributeValueCompletions } from './utils';

const attributePattern = /\s+([a-zA-Z][-a-zA-Z]*)\s*=\s*$/;
const tagPattern = /<([a-zA-Z][-a-zA-Z]*)(?:\s|$)/;

// https://github.com/atom/autocomplete-plus/wiki/Provider-API
export default (request) => {
  let { editor, bufferPosition, prefix } = request;
  prefix = prefix.trim();

  if (isAttributeValueStart(request)) {
    const tag = getPreviousTag(editor, bufferPosition);
    const attribute = getPreviousAttribute(editor, bufferPosition);
    return getAttributeValueCompletions(tag, attribute, prefix);
  }

  if (isAttributeStart(request)) {
    const tag = getPreviousTag(editor, bufferPosition);
    return getAttributeNameCompletions(tag, prefix);
  }

  if (isTagStart(request)) {
    const ignorePrefix =
      editor.getTextInRange([[bufferPosition.row, bufferPosition.column - 1], bufferPosition]) === '<';
    return getTagNameCompletions(ignorePrefix ? '' : prefix);
  }

  return [];
};

function isTagStart({ prefix, scopeDescriptor, bufferPosition, editor }) {
  if (prefix.trim() && prefix.indexOf('<') === -1) {
    return hasTagScope(scopeDescriptor.getScopesArray());
  }

  prefix = editor.getTextInRange([[bufferPosition.row, bufferPosition.column - 1], bufferPosition]);

  const scopes = scopeDescriptor.getScopesArray();
  return prefix === '<' && scopes[0] === 'text.html.isml' && scopes.length === 1;
}

function hasTagScope(scopes) {
  for (const scope of scopes) {
    if (scope.startsWith('meta.tag.') && (scope.endsWith('.html') || scope.endsWith('.isml'))) return true;
  }

  return false;
}

function isAttributeStart({ prefix, scopeDescriptor, bufferPosition, editor }) {
  const scopes = scopeDescriptor.getScopesArray();
  if (!getPreviousAttribute(editor, bufferPosition) && prefix && !prefix.trim()) {
    return hasTagScope(scopes);
  }

  const previousBufferPosition = [bufferPosition.row, Math.max(0, bufferPosition.column - 1)];
  const previousScopes = editor.scopeDescriptorForBufferPosition(previousBufferPosition);
  const previousScopesArray = previousScopes.getScopesArray();

  if (previousScopesArray.includes('entity.other.attribute-name.html')) return true;
  if (!hasTagScope(scopes)) return false;

  return (
    scopes.includes('punctuation.definition.tag.end.html.isml') &&
    !previousScopesArray.includes('punctuation.definition.tag.end.html.isml')
  );
}

function isAttributeValueStart({ scopeDescriptor, bufferPosition, editor }) {
  const scopes = scopeDescriptor.getScopesArray();

  const previousBufferPosition = [bufferPosition.row, Math.max(0, bufferPosition.column - 1)];
  const previousScopes = editor.scopeDescriptorForBufferPosition(previousBufferPosition);
  const previousScopesArray = previousScopes.getScopesArray();

  return (
    hasStringScope(scopes) &&
    hasStringScope(previousScopesArray) &&
    !previousScopesArray.includes('punctuation.definition.string.end.html') &&
    hasTagScope(scopes) &&
    getPreviousAttribute(editor, bufferPosition) != null
  );
}

function getPreviousTag(editor, bufferPosition) {
  let { row } = bufferPosition;

  while (row >= 0) {
    const match = tagPattern.exec(editor.lineTextForBufferRow(row));
    const tag = match && match[1];

    if (tag) return tag;
    row--;
  }
}

function getPreviousAttribute(editor, bufferPosition) {
  let quoteIndex = bufferPosition.column - 1;

  while (quoteIndex) {
    const scopes = editor.scopeDescriptorForBufferPosition([bufferPosition.row, quoteIndex]);
    const scopesArray = scopes.getScopesArray();

    if (!hasStringScope(scopesArray) || scopesArray.indexOf('punctuation.definition.string.begin.html') !== -1) {
      break;
    }

    quoteIndex--;
  }

  const match = attributePattern.exec(
    editor.getTextInRange([
      [bufferPosition.row, 0],
      [bufferPosition.row, quoteIndex]
    ])
  );

  return match && match[1];
}

function hasStringScope(scopes) {
  return scopes.includes('string.quoted.double.html') || scopes.includes('string.quoted.single.html');
}
