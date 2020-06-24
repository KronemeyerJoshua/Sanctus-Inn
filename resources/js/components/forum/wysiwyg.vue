<template>
    <div style="position: relative;">
            <div class="toolbar is-flex" style="flex-flow: row wrap">
                <button class="toolbar-btn button" @click="executeCommand('underline')"><FontAwesomeIcon class="icon" icon="underline" /></button>
                <button class="toolbar-btn button" @click="executeCommand('bold')"><FontAwesomeIcon class="icon" icon="bold" /></button>
                <button class="toolbar-btn button" @click="executeCommand('italic')"><FontAwesomeIcon class="icon" icon="italic" /></button>
                <button class="toolbar-btn button" @click="executeCommand('strikethrough')"><FontAwesomeIcon class="icon" icon="strikethrough" /></button>
                <button class="toolbar-btn button" @click="executeCommand('subscript')"><FontAwesomeIcon class="icon" icon="subscript" /></button>
                <button class="toolbar-btn button" @click="executeCommand('superscript')"><FontAwesomeIcon class="icon" icon="superscript" /></button>
                <button class="toolbar-btn button" @click="executeCommand"><FontAwesomeIcon class="icon" icon="paragraph" /></button>
                <button class="toolbar-btn button" @click="executeCommand('insertOrderedList')"><FontAwesomeIcon class="icon" icon="list-ol" /></button>
                <button class="toolbar-btn button" @click="executeCommand('insertUnorderedList')"><FontAwesomeIcon class="icon" icon="list-ul" /></button>
                <button class="toolbar-btn button" @click="show('align')" ref="align"><FontAwesomeIcon class="icon" icon="align-left" /></button>
                <button class="toolbar-btn button" @click="show('link')" ref="link"><FontAwesomeIcon class="icon" icon="link" /></button>
                <button class="toolbar-btn button" @click="show('image')" ref="image"><FontAwesomeIcon class="icon" icon="image" /></button>
                <button class="toolbar-btn button" @click="show('video')" ref="video"><FontAwesomeIcon class="icon" icon="video" /></button>
                <button class="toolbar-btn button" @click="show('table')" ref="table"><FontAwesomeIcon class="icon" icon="table" /></button>
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
            <div @focus="showws = false" id="content-area" class="textarea" ref="text" contenteditable></div>
            <button class="button is-primary" @click="emitButton">Post That Shizz</button>

    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
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
            emitButton() {
                this.$emit('button-clicked', this.$refs.text.innerHTML);
                this.$refs.text.innerHTML = '';
            },
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
            executeCommand(cmd, src) {
                document.execCommand(cmd, false, src);
                document.getElementById('content-area').focus();
            },
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

                if (document.getSelection().type.localeCompare("Range") === 0 && document.getSelection().anchorNode.parentElement === this.$refs.text) {
                    console.log(document.getSelection());
                    this.newValue = this.content.substr(document.getSelection().focusOffset, document.getSelection().anchorOffset);
                    this.originSelect = this.newValue;
                    this.caretPosition = document.getSelection().focusOffset;
                }

                if (document.getSelection().type.localeCompare("Caret") === 0 && document.getSelection().anchorNode.parentElement === this.$refs.text) {
                    this.caretPosition = document.getSelection().anchorOffset;
                }
            }
        },
        data() {
            return {
                caretPosition: 0,
                originSelect: '',
                content: '',
                link: '',
                newValue: '',
                el: {},
                x: 0,
                y: 0,
                showws: false
            }
        },
        beforeDestroy: function () {
            // No longer on this page, destroy our listener
            window.removeEventListener('resize', this.updatePopupPosition)
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
