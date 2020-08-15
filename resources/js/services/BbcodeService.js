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
    },
    url: {
        tagStart: '[url]',
        tagEnd: '[/url]'
    },
    img: {
        tagStart: '[img]',
        tagEnd: '[/img]'
    },
    youtube: {
        tagStart: '[youtube]',
        tagEnd: '[/youtube]'
    },
    quote: {
        tagStart: '[quote]',
        tagEnd: '[/quote]'
    },
    code: {
        tagStart: '[code]',
        tagEnd: '[/code]'
    },
    spoiler: {
        tagStart: '[spoiler]',
        tagEnd: '[/spoiler]'
    }
};

export function decode(content) {
    // This is the bbcode tag regex -> html map
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
        '\\[url\\](.+?)\\[/url\\]': '<a href="$1">$1</a>',
        '\\[url=(.+?)\\](.+?)\\[/url\\]': '<a href="$1">$2</a>',
        '\\[img\\](.+?)\\[/img\\]': '<img class="image-post" src="$1">',
        '\\[img (width=(\\d+[\\s]?)|height=(\\d+[\\s]?)) (width=(\\d+[\\s]?)|height=(\\d+[\\s]?))\](.+?)\\[/img\\]': '<img width="$3" height="$5" class="image-post" src="$7">',
        '\\[youtube\\].*(v=|.be)/(.*)\\\\?\\[/youtube\\]': '<iframe width="560" height="315" src="https://youtube.com/embed/$2" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    };

    // Get our keys and make them into actual regex objects
    let bb = Object.keys(bbCodeMap).map((regex) => {
        const replacement = bbCodeMap[regex];

        return {
            regexp: new RegExp(regex, 'igm'),
            replacement: replacement
        };
    });

    // Go through our tags one-by-one
    // By looking for tags one at a time, it preserves nested tags
    return bb.reduce((text, bbObj) => text.replace(bbObj.regexp, bbObj.replacement), content);
}

export default bbcode;
