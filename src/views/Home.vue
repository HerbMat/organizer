<template>
  <div class="home">
    <Organizer></Organizer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Organizer from '@/components/Organizer.vue'

@Options({
  components: {
    Organizer
  },
  props: {

  }
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(5, minmax(10rem, 1fr));
  grid-template-rows: repeat(auto-fill, 20rem);
  div {
    border: 1px black solid;
  }
}
</style>
