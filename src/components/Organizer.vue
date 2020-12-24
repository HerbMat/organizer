<template>
  <div>
    <h1>Organizer</h1>
    <ul >
      <li draggable="true"
          @dragstart="startDrag($event, index)"
          @dragover.prevent
          @dragenter.prevent
          @drop.prevent.stop="dragDrop($event, index)"
          v-for="(event, index) in events"
          v-bind:key="event">{{ event }}</li>
    </ul>
    <label for="myText">Write text</label>
    <input nname="myText" type="text" v-model="newEvent" />
    <input type="submit" @click.prevent="addNewEvent" value="Send" />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Organizer extends Vue {
  private newEvent = '';

  private events: Array<string> = [
    'Element one',
    'Element two',
    'Element three'
  ];

  public addNewEvent (): void {
    this.events.push(this.newEvent)
    this.newEvent = ''
  }

  public startDrag (evt: DragEvent, eventIndex: number): void {
    if (evt?.dataTransfer) {
      const dataTransfer = evt.dataTransfer
      dataTransfer.dropEffect = 'move'
      dataTransfer.effectAllowed = 'move'
      dataTransfer.setData('oldEventPosition', eventIndex.toString())
    }
  }

  public dragDrop (evt: DragEvent, newEventPosition: number): void {
    if (evt?.dataTransfer?.getData('oldEventPosition')) {
      const eventOldPosition = Number(evt.dataTransfer.getData('oldEventPosition'))
      const eventToMove = this.events[eventOldPosition]
      this.events.splice(eventOldPosition, 1)
      this.events.splice(newEventPosition, 0, eventToMove)
    }
  }
}
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
