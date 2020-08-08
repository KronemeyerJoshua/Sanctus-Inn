let bbcode = {
    bold: {
        tagStart: "[b]",
        tagEnd: "[/b]"
    },
    underline: {
        tagStart: "[u]",
        tagEnd: "[/u]"
    },
    italic: {
        tagStart: "[i]",
        tagEnd: "[/i]"
    },
    strikethrough: {
        tagStart: "[s]",
        tagEnd: "[/s]"
    },
    subscript: {
        tagStart: "[sub]",
        tagEnd: "[/sub]"
    },
    superscript: {
        tagStart: "[sup]",
        tagEnd: "[/sup]"
    }
};

export function decode(content) {
    let bbCodeMap = {
        '\\[b\\](.+?)\\[/b\\]': '<strong>$1</strong>',
        '\\[u\\](.+?)\\[/u\\]': '<u>$1</u>',
        '\\[i\\](.+?)\\[/i\\]': '<i>$1</i>',
        '\\[s\\](.+?)\\[/s\\]': '<del>$1</del>',
        '\\[sub\\](.+?)\\[/sub\\]': '<sub>$1</sub>',
        '\\[sup\\](.+?)\\[/sup\\]': '<sup>$1</sup>'
    };

    let bb = Object.keys(bbCodeMap).map((regex) => {
        const replacement = bbCodeMap[regex];

        return {
            regexp: new RegExp(regex, 'igm'),
            replacement: replacement
        };
    });

    return bb.reduce((text, bbObj) => text.replace(bbObj.regexp, bbObj.replacement), content);
}

export default bbcode;
