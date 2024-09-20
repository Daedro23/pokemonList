<script setup>
defineProps({ 
    msg: { type: String, required: true },
    icon: { type: String }
});
defineEmits(['fn']);
</script>

<template>
  <button class="btn" @click="$emit('fn')">
    <img v-if="icon" :src="icon" alt="button icon" class="button-icon" />
    <span>{{ msg }}</span>
  </button>
</template>

<style lang="scss">
    .btn {
        color: $white;
        background-color: $red;
        padding: 10px 20px;
        border: $red;
        border-radius: 20px;
        display: flex;
        align-items: center; 
        justify-content: center;
        &:hover {
            cursor: pointer;
            opacity: 0.7;
            transition: 0.3s;
        }
        span {
            font-weight: bold;
        }
    }

  .button-icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
</style>
