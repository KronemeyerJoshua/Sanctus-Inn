<template>
    <div>
        <span>Text: </span>
        <input id="link-text" v-model="newValue" />
        <span>URL: </span>
        <input id="link" v-model="link" />
        <button class="button is-small" @click="$emit('insert-link', newValue, link)">Insert</button>
    </div>
</template>

<script>
    export default {
        name: "InsertLink",
        data() {
            return {
                newValue: '',
                link: ''
            }
        },
        props: {
            linkProp: {
                type: [String],
                default: ''
            },
            valueProp: {
                type: [String],
                default: ''
            }
        },
        created() {
            this.link = this.linkProp;
            this.newValue = this.valueProp;
        }
    }
</script>

<style scoped>
    input {
        background: rgba(200,200,200,0.8);
        width: 100%;
    }

    .button {
        margin: 2px;
        background: transparent;
        color: white;
    }

</style>
