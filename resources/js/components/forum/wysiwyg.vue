<template>
    <div style="position: relative;">
            <div class="toolbar is-flex" style="flex-flow: row wrap">
                <button class="toolbar-btn button" @click="executeCommand('underline')"><font-awesome-icon class="icon" icon="underline" /></button>
                <button class="toolbar-btn button" @click="executeCommand('bold')"><font-awesome-icon class="icon" icon="bold" /></button>
                <button class="toolbar-btn button" @click="executeCommand('italic')"><font-awesome-icon class="icon" icon="italic" /></button>
                <button class="toolbar-btn button" @click="executeCommand('strikethrough')"><font-awesome-icon class="icon" icon="strikethrough" /></button>
                <button class="toolbar-btn button" @click="executeCommand('subscript')"><font-awesome-icon class="icon" icon="subscript" /></button>
                <button class="toolbar-btn button" @click="executeCommand('superscript')"><font-awesome-icon class="icon" icon="superscript" /></button>
                <button class="toolbar-btn button" @click="executeCommand"><font-awesome-icon class="icon" icon="paragraph" /></button>
                <button class="toolbar-btn button" @click="executeCommand('insertOrderedList')"><font-awesome-icon class="icon" icon="list-ol" /></button>
                <button class="toolbar-btn button" @click="executeCommand('insertUnorderedList')"><font-awesome-icon class="icon" icon="list-ul" /></button>
                <button class="toolbar-btn button" @click="show('align')" ref="align"><font-awesome-icon class="icon" icon="align-left" /></button>
                <button class="toolbar-btn button" @click="show('link')" ref="link"><font-awesome-icon class="icon" icon="link" /></button>
                <button class="toolbar-btn button" @click="show('image')" ref="image"><font-awesome-icon class="icon" icon="image" /></button>
                <button class="toolbar-btn button" @click="show('video')" ref="video"><font-awesome-icon class="icon" icon="video" /></button>
                <button class="toolbar-btn button" @click="show('table')" ref="table"><font-awesome-icon class="icon" icon="table" /></button>
            </div>
            <div class="popup" v-if="showws" :style="'left:' + this.x + 'px; top: ' + this.y + 'px'">
                <InsertLink v-if="this.el === 'link'" :link-prop="link" :value-prop="newValue" @insert-link="insertLink"></InsertLink>
            </div>
            <div @focus="showws = false" class="textarea" ref="text" v-html="content" contenteditable></div>


    </div>
</template>

<script>
    import InsertLink from "../wysiwyg/InsertLink";
    export default {
        name: "wysiwyg",
        components: {InsertLink},
        methods: {
            insertLink(value, link) {
                // Grab data from insert-link event
                this.newValue = value;
                this.link = link;

                // We don't want random anchor tags, ensure content is valid
                if (this.originSelect.length > 0 && this.link.length > 0) {
                    this.content = this.content.replace(this.originSelect, "<a href='" + this.link + "'>" + this.newValue + "</a>");
                }
                else if (this.link.length < 1 || this.newValue < 1) {
                    this.content += this.newValue
                }
                else {
                    this.content += "<a href='" + this.link + "'>" + this.newValue + "</a>";
                }

                // Hide the window, reset the input data
                this.showws = false;
                this.link = '';
                this.newValue = '';
            },
            executeCommand(cmd, src) {
                document.execCommand(cmd, false, src);
            },
            updatePopupPosition() {
                // On window.resize, ensures button popup stays below button
                if (this.showws) {
                    this.x = this.$refs[this.el].offsetLeft - 30;
                    this.y = this.$refs[this.el].offsetTop + 45;
                }
            },
            show(ref) {
                this.showws = !this.showws;
                if (this.showws) {
                    this.el = ref;
                    this.x = this.$refs[ref].offsetLeft - 30;
                    this.y = this.$refs[ref].offsetTop + 45;
                }
                this.originSelect = this.selection;
                this.newValue = this.selection;
            }
        },
        data() {
            return {
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
        computed: {
            selection() {
                // Check for nulls
                if (document.getSelection().anchorNode) {
                    return document.getSelection().anchorNode.data;
                } else {
                    return '';
                }
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
</style>
