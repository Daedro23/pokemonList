<script setup>
defineProps({ msg: { type: String, required: true} })
defineEmits(['fn'])
</script>

<template>
  <button class="btn" @click="$emit('fn')">{{ msg }}</button>
</template>

<style lang="scss">

    .btn {
        color: $white;
        background-color: $red;
        padding: 10px 20px;
        border: $red;
        border-radius: 20px;
        font-weight: bold;
        &:hover {
            cursor: pointer;
        }
    }

</style>
