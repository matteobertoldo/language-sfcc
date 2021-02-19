'use babel';

import COMPLETIONS from '../completions';
import { generateRange } from 'atom-linter';

function getTagNameCompletions(prefix) {
  const completions = [];

  for (const tag in COMPLETIONS.tags) {
    const options = COMPLETIONS.tags[tag];

    if (firstCharsEqual(tag, prefix)) {
      const { description, rightLabel } = options;

      completions.push({
        description: description || `ISML <${tag}> tag`,
        descriptionMoreURL: getDocumentation(tag),
        rightLabel: rightLabel || null,
        text: tag,
        type: tag === 'isbreak' || tag === 'iscontinue' || tag === 'isnext' ? 'keyword' : 'tag'
      });
    }
  }

  return completions;
}

function getAttributeNameCompletions(tag, prefix) {
  const completions = [];
  const tagAttributes = getTagAttributes(tag);

  for (const attribute of tagAttributes) {
    const options = getAttribute(tag, attribute);

    if (firstCharsEqual(attribute, prefix)) {
      const { description } = options;

      completions.push({
        description: description || `${attribute} attribute local to <${tag}> tag`,
        descriptionMoreURL: getDocumentation(tag),
        displayText: attribute,
        rightLabel: `<${tag}>`,
        snippet: `${attribute}="$1"$0`,
        type: 'attribute'
      });
    }
  }

  return completions;
}

function getAttributeValueCompletions(tag, attribute, prefix) {
  const completions = [];
  const values = getAttributeValues(tag, attribute);
  const attr = getAttribute(tag, attribute);

  const buildType = (type) => {
    return completions.length === 0 && attr && attr.type === type;
  };

  for (const value of values) {
    if (firstCharsEqual(value, prefix)) {
      completions.push(buildAttributeValueCompletion(tag, attribute, value));
    }
  }

  if (buildType('boolean')) {
    completions.push(buildAttributeValueCompletion(tag, attribute, 'true'));
    completions.push(buildAttributeValueCompletion(tag, attribute, 'false'));
  } else if (buildType('switcher')) {
    completions.push(buildAttributeValueCompletion(tag, attribute, 'on'));
    completions.push(buildAttributeValueCompletion(tag, attribute, 'off'));
  }

  return completions;
}

function buildAttributeValueCompletion(tag, attribute, value) {
  return {
    description: `${value} value for ${attribute} attribute local to <${tag}> tag`,
    descriptionMoreURL: getDocumentation(tag),
    rightLabel: `<${tag}>`,
    text: value,
    type: 'value'
  };
}

function getAttributeValues(tag, attribute) {
  const result = getAttribute(tag, attribute);
  if (result && result.values) return result.values;
  return [];
}

function getAttribute(tag, attribute) {
  return COMPLETIONS.attributes[`${tag}/${attribute}`]
    ? COMPLETIONS.attributes[`${tag}/${attribute}`]
    : COMPLETIONS.attributes[attribute];
}

function getDocumentation(tag) {
  return `https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/content/b2c_commerce/topics/isml/b2c_${tag}.html`;
}

function getTagAttributes(tag) {
  const result = COMPLETIONS.tags[tag];
  if (result && result.attributes) return result.attributes;
  return [];
}

function firstCharsEqual(a, b) {
  if (b.length === 0) return true;
  return a[0].toLowerCase() === b[0].toLowerCase();
}

function getDiagnosticsList(occurrenceList, filePath, editor) {
  const diagnostics = [];

  for (const rule in occurrenceList) {
    occurrenceList[rule][filePath].forEach((occurrence) => {
      const start = occurrence.lineNumber - (occurrence.rule === 'empty-eof' ? 0 : 1);
      const end = 0;

      diagnostics.push({
        severity: occurrence.level,
        excerpt: `${occurrence.message}`,
        location: {
          file: filePath,
          position: generateRange(editor, start, end)
        }
      });
    });
  }

  return diagnostics;
}

export default {
  getTagNameCompletions,
  getAttributeNameCompletions,
  getAttributeValueCompletions,
  getDiagnosticsList
};
