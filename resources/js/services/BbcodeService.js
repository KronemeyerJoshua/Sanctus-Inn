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
    },
    ulist: {
        tagStart: "[list]\n[*] ",
        tagEnd: "\n[/list]"
    },
    olist: {
        tagStart: "[list=1]\n[*] ",
        tagEnd: "\n[/list]"
    },
    aleft: {
        tagStart: '[left]',
        tagEnd: '[/left]'
    },
    acenter: {
        tagStart: '[center]',
        tagEnd: '[/center]'
    },
    aright: {
        tagStart: '[right]',
        tagEnd: '[/right]'
    }
};

export function decode(content) {
    let bbCodeMap = {
        '\\[b\\](.+?)\\[/b\\]': '<strong>$1</strong>',
        '\\[u\\](.+?)\\[/u\\]': '<u>$1</u>',
        '\\[i\\](.+?)\\[/i\\]': '<i>$1</i>',
        '\\[s\\](.+?)\\[/s\\]': '<del>$1</del>',
        '\\[sub\\](.+?)\\[/sub\\]': '<sub>$1</sub>',
        '\\[sup\\](.+?)\\[/sup\\]': '<sup>$1</sup>',
        '\\[center\\](.+?)\\[/center\\]': '<p style="text-align: center">$1</p>',
        '\\[left\\](.+?)\\[/left\\]': '<p style="text-align: left">$1</p>',
        '\\[right\\](.+?)\\[/right\\]': '<p style="text-align: right">$1</p>',
        '\\[list\\]((.*|\n)*)\\[/list\\]': '<ul>$1</ul>',
        '^\\[\\*\\](.+?)$': '<li>$1</li>',
        '\\[list=1\\]((.*|\n)*)\\[/list\\]': '<ol>$1</ol>',
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
