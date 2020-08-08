<template>
    <div style="">
            <div class="toolbar is-flex" style="flex-flow: row wrap">
                <span class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.underline)"><FontAwesomeIcon class="icon" icon="underline" /></span>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.bold)"><FontAwesomeIcon class="icon" icon="bold" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.italic)"><FontAwesomeIcon class="icon" icon="italic" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.strikethrough)"><FontAwesomeIcon class="icon" icon="strikethrough" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.subscript)"><FontAwesomeIcon class="icon" icon="subscript" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="insertbb(bbcode.superscript)"><FontAwesomeIcon class="icon" icon="superscript" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click=""><FontAwesomeIcon class="icon" icon="paragraph" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click=""><FontAwesomeIcon class="icon" icon="list-ol" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click=""><FontAwesomeIcon class="icon" icon="list-ul" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="show('align')" ref="align"><FontAwesomeIcon class="icon" icon="align-left" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="show('link')" ref="link"><FontAwesomeIcon class="icon" icon="link" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="show('image')" ref="image"><FontAwesomeIcon class="icon" icon="image" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="show('video')" ref="video"><FontAwesomeIcon class="icon" icon="video" /></button>
                <button class="toolbar-btn button" @mousedown="preventDefault" @click="show('table')" ref="table"><FontAwesomeIcon class="icon" icon="table" /></button>
            </div>
            <div class="popup" v-if="showws" :style="'left:' + this.x + 'px; top: ' + this.y + 'px'">
                <InsertLink v-if="this.el === 'link'" :link-prop="link" :value-prop="newValue" @insert-link="insertLink"></InsertLink>

                <div v-if="this.el === 'image'">
                    <input v-model="link" />
                    <button @click="insertImage(link)">Insert</button>
                </div>

                <div v-if="this.el === 'video'">
                    <input v-model="link" />
                    <button @click="insertVideo(link)">Insert</button>
                </div>
            </div>
            <textarea @focus="showws = false" id="content-area" class="textarea" ref="text" v-model="content"></textarea>
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
        faSuperscript, faParagraph, faListOl, faListUl, faAlignLeft, faLink, faImage, faVideo, faTable
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
        faLink,
        faImage,
        faVideo,
        faTable);
    // TODO: Image, video, table, align, paragraph
    import InsertLink from "../wysiwyg/InsertLink";
    export default {
        name: "wysiwyg",
        components: {InsertLink},
        methods: {
            preventDefault(e) {
                // This prevents the textarea from losing focus on button mousedown
                e.preventDefault();
            },
            preview() {
                // TODO: Implement Preview Window
            },
            insertbb(ref) {
                let e = this.$refs.text;
                let selectionStart = e.selectionStart;
                let selectionEnd = e.selectionEnd;
                this.content = this.content.substring(0, e.selectionStart) + ref.tagStart + this.content.substring(e.selectionStart, e.selectionEnd) + ref.tagEnd + this.content.substring(e.selectionEnd, e.length);

                // This forces vue to setSelectionRange after the content variable has been updated
                setTimeout(() => this.$refs.text.setSelectionRange(selectionStart + ref.tagStart.length, selectionEnd + ref.tagEnd.length-1));
            },
            bbCodeParse() {
                let html = decode(this.content);
                this.$emit('button-clicked', html);
            },
            // TODO: UPDATE BELOW FUNCTIONS TO CORRESPOND TO TEXTAREA AND V-MODEL UPDATES
            insertImage(imgUrl) {
                this.imageExists(imgUrl, 5000)
                .then( () => this.insert( "<img src='" + imgUrl + "'>"))
                .catch( () => false); // TODO: SEND ERROR MESSAGE TO POP-UP WINDOW
            },
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
                        img.src = "//!!!!/test.jpg";
                        reject("timeout");
                    }, timeout);

                    img.src = imgUrl;
                })
            },
            insertLink(value, link) {
                // Grab data from insert-link event
                this.newValue = value;
                this.link = link;

                // We don't want random anchor tags, ensure content is valid
                if (this.originSelect.length > 0 && this.link.length > 0) {
                    this.$refs.text.innerHTML = this.$refs.text.innerHTML.replace(this.originSelect, "<a href='" + this.link + "'>" + this.newValue + "</a>");
                }
                else if (this.link.length < 1 || this.newValue < 1) {
                    this.insert(this.newValue);
                }
                else {
                    this.insert("<a href='" + this.link + "'>" + this.newValue + "</a>");
                }

                // Hide the window, reset the input data
                this.showws = false;
                this.link = '';
                this.newValue = '';
            },
            insert(string) {
                this.$refs.text.innerHTML = this.$refs.text.innerHTML.substr(0, this.caretPosition) + string + this.$refs.text.innerHTML.substr(0, this.$refs.text.innerHTML.length);
            },
            // END TODO
            updatePopupPosition() {
                // On window.resize, ensures button popup stays below button
                if (this.showws) {
                    this.x = this.$refs[this.el].offsetLeft - 30;
                    this.y = this.$refs[this.el].offsetTop + 45;
                }
            },
            show(ref) {
                this.showws = true;
                if (this.showws) {
                    this.el = ref;
                    this.x = this.$refs[ref].offsetLeft - 30;
                    this.y = this.$refs[ref].offsetTop + 45;
                }
            }
        },
        data() {
            return {
                content: '',
                link: '',
                newValue: '',
                el: {},
                x: 0,
                y: 0,
                showws: false,
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
    .popup {
        z-index: 1000 !important;
        position: absolute;
        top: 0;
        background: rgba(40,40,40,0.8);
        border: 1px solid rgba(212,212,212,0.7);
        border-radius: 5px;
        padding: 5px;
    }

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
