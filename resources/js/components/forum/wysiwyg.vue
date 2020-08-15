<template>
    <div>
            <div class="toolbar is-flex" style="flex-flow: row wrap">
                <span class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.underline)"><FontAwesomeIcon class="icon" icon="underline" /></span>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.bold)"><FontAwesomeIcon class="icon" icon="bold" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.italic)"><FontAwesomeIcon class="icon" icon="italic" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.strikethrough)"><FontAwesomeIcon class="icon" icon="strikethrough" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.subscript)"><FontAwesomeIcon class="icon" icon="subscript" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.superscript)"><FontAwesomeIcon class="icon" icon="superscript" /></button>

                <!-- Paragraph Dropdown Menu -->
                <div :class="dropdownmenus.paragraph ? 'dropdown is-active' : 'dropdown'">
                    <div class="dropdown-trigger">
                        <button class="toolbar-btn button" @mousedown="preventDefault" @click="dropdownmenus.paragraph = !dropdownmenus.paragraph"><FontAwesomeIcon class="icon" icon="paragraph" /></button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <a class="dropdown-item">
                                Quote
                            </a>
                            <a class="dropdown-item">
                                Code
                            </a>
                            <a class="dropdown-item">
                                Spoiler
                            </a>
                        </div>
                    </div>
                </div>
                <!-- END Paragraph Dropdown Menu -->

                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.olist)"><FontAwesomeIcon class="icon" icon="list-ol" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.ulist)"><FontAwesomeIcon class="icon" icon="list-ul" /></button>

                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.aleft)" ref="align-left"><FontAwesomeIcon class="icon" icon="align-left" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.acenter)" ref="align-center"><FontAwesomeIcon class="icon" icon="align-center" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.aright)" ref="align-right"><FontAwesomeIcon class="icon" icon="align-right" /></button>

                <!-- Url Dropdown Menu -->
                <div :class="dropdownmenus.url ? 'dropdown is-active' : 'dropdown'">
                    <div class="dropdown-trigger">
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="dropdownmenus.url = !dropdownmenus.url" ref="url"><FontAwesomeIcon class="icon" icon="link" /></button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <input v-model="image" />
                            <button @click="insertUrl">Ok</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- END Paragraph Dropdown Menu -->

                <!-- Image Dropdown Menu -->
                <div :class="dropdownmenus.image ? 'dropdown is-active' : 'dropdown'">
                    <div class="dropdown-trigger">
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="dropdownmenus.image = !dropdownmenus.image" ref="image"><FontAwesomeIcon class="icon" icon="image" /></button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <span ref="imageError"></span>
                            <input v-model="image" />
                            <button @click="insertImg">Ok</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- END Image Dropdown Menu -->

                <button class="toolbar-btn button" @mousedown="preventDefault" @click="show('video')" ref="video"><FontAwesomeIcon class="icon" icon="video" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="show('table')" ref="table"><FontAwesomeIcon class="icon" icon="table" /></button>
            </div>

            <textarea @click="Object.keys(dropdownmenus).forEach(k => dropdownmenus[k] = false)" id="content-area" class="textarea" ref="text" v-model="content"></textarea>
            <button class="button is-primary" @click="bbCodeParse">Post</button>
        <button class="button is-primary" @click="preview">Preview</button>

    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import bbcode from "../../services/BbcodeService";
    import { decode } from "../../services/BbcodeService";
    import {
        faUnderline,
        faCode,
        faBold,
        faItalic,
        faStrikethrough,
        faSubscript,
        faSuperscript,
        faParagraph,
        faListOl,
        faListUl,
        faAlignLeft,
        faAlignCenter,
        faAlignRight,
        faLink,
        faImage,
        faVideo,
        faTable
    } from "@fortawesome/free-solid-svg-icons";

    library.add(faUnderline,
        faCode,
        faBold,
        faItalic,
        faStrikethrough,
        faSubscript,
        faSuperscript,
        faParagraph,
        faListOl,
        faListUl,
        faAlignLeft,
        faAlignRight,
        faAlignCenter,
        faLink,
        faImage,
        faVideo,
        faTable);
    // TODO: Image, video, table, align, paragraph
    export default {
        name: "wysiwyg",
        methods: {
            /**
             * Prevents the textarea from losing focus when clicking buttons
             * @param e The element affect
             */
            preventDefault(e) {
                e.preventDefault();
            },
            /**
             * Preview Window for Bbcode -> HTML
             */
            preview() {
                // TODO: Implement Preview Window
            },
            /**
             * Inserts bbcode into the textarea
             * @param ref Reference to bbcode js lib for tag
             */
            insertbb(ref) {
                // Shorthand Reference
                let e = this.$refs.text;

                // Grab selection indices before we change any content
                let selectionStart = e.selectionStart;
                let selectionEnd = e.selectionEnd;

                // Insert our bbcode tags
                this.content = this.content.substring(0, e.selectionStart) + ref.tagStart + this.content.substring(e.selectionStart, e.selectionEnd) + ref.tagEnd + this.content.substring(e.selectionEnd, e.length);

                // This forces vue to setSelectionRange after the content variable has been updated
                setTimeout(() => this.$refs.text.setSelectionRange(selectionStart + ref.tagStart.length, selectionEnd + ref.tagStart.length));
            },
            /**
             * Special function for URL bbcode inserts
             */
            insertUrl() {
                // Shorthand Reference
                let e = this.$refs.text;

                // Grab selection indices before we change any content
                let selectionStart = e.selectionStart;
                let selectionEnd = e.selectionEnd;

                if (selectionStart !== selectionEnd) {
                    // Wraps existing selection in url tag
                    this.content = this.content.substring(0, e.selectionStart) + "[url=" + this.link + "]" +
                        this.content.substring(e.selectionStart, e.selectionEnd) + "[/url]" + this.content.substring(e.selectionEnd, e.length);
                }
                else {
                    // No selection found, wrapping url in url tags
                    this.content = this.content.substring(0, e.selectionStart) + "[url=" + this.link + "]" +
                        this.link + "[/url]" + this.content.substring(e.selectionEnd, e.length);
                }

                this.dropdownmenus.url = false;
                // This forces vue to setSelectionRange after the content variable has been updated
                setTimeout(() => this.$refs.text.setSelectionRange(selectionStart, selectionEnd));
            },
            /**
             *
             */
            insertImg() {
                // Check if is image link
                this.imageExists(this.image, 2000)
                    .then(() => {
                        this.content += bbcode.img.tagStart + this.image + bbcode.img.tagEnd;
                    })
                    .catch( (error) => {
                        this.$refs.imageError.innerHTML = "Image could not be loaded";
                        console.log(error);
                    })
            },
            /**
             * Parses bbcode into HTML before submission
             */
            bbCodeParse() {
                let html = decode(this.content);
                this.$emit('button-clicked', html);
            },
            // TODO: UPDATE BELOW FUNCTIONS TO CORRESPOND TO TEXTAREA AND V-MODEL UPDATES
            insertVideo(vidUrl) {
                this.insert("<iframe width='400' height='400' src='" + vidUrl + "' />")
            },
            imageExists(imgUrl, timeoutT) {
                return new Promise(function (resolve, reject) {
                    let timeout = timeoutT;
                    let timer, img = new Image();

                    // Image could not be loaded
                    img.onerror = img.onabort = function() {
                        clearTimeout(timer);
                        reject("Image could not be loaded");
                    };

                    // Image Loaded Successfully
                    img.onload = function() {
                        clearTimeout(timer);
                        resolve("success");
                    };

                    // Image timed out, reset img src
                    timer = setTimeout(function () {
                        img.src = "UnknownImage";
                        reject("timeout");
                    }, timeout);

                    img.src = imgUrl;
                })
            },
            // END TODO
        },
        data() {
            return {
                dropdownmenus: {
                    paragraph: false,
                    url: false,
                    image: false,
                    table: false
                },
                content: '',
                link: '',
                image: ''
            }
        },
        beforeDestroy: function () {
            // No longer on this page, destroy our listener
            window.removeEventListener('resize', this.updatePopupPosition)
        },
        beforeCreate() {
            // This needs to be established for us to use bbcode library in our html template
            this.bbcode = bbcode;
        },
        mounted() {
            // For popup adjust position on resize
            window.addEventListener('resize', this.updatePopupPosition);
        },
    }
</script>

<style scoped>
    .icon {
        color: white;
    }
    .button {
        margin: 2px;
        background: transparent;
    }
    .textarea {
        padding: 20px;
        width: 300px;
        height: 200px;
        overflow: auto;
        text-wrap: normal;
        resize: vertical;
        background: transparent;
        color: rgba(230,230,230,0.9);
    }
    .textarea:active, .textarea:focus{
        border-color: rgba(251, 174, 58, 0.7);
        box-shadow: none;
    }
    ol {
        padding: 10px;
    }
    .toolbar-btn {
    }
    ul {
        list-style: inherit !important;
    }
</style>
