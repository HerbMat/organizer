<template>
  <div class="error" v-if="errors.length">
    <p><b>Please correct the following error(s):</b></p>
    <ul>
      <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface FormErrorsProps {
  errors?: Array<string>;
}

const FormErrors = defineComponent({
  name: 'FormErrors',
  props: {
    errors: {
      type: Array
    }
  }
})
export default FormErrors
</script>

<style scoped lang="scss">
  div {
    display: grid;
    justify-content: center;
  }

  li {
    border: solid 1px;
    height: 2rem;
  }

  ul {
    max-width: 70rem;
    list-style-type: none;
    padding: 0;
  }

  [draggable] {
    user-select: none;
  }
</style>
