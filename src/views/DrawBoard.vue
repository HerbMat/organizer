<template>
  <div class="content">
    <div id="firstBoard">
      <h1>Board 1</h1>
      <canvas></canvas>
    </div>
    <div id="secondBoard">
      <h1>Board 2</h1>
      <canvas></canvas>
    </div>
    <form id="inputs" @keyup.enter.prevent="">
      <FormErrors :errors="_errors"></FormErrors>
      <label for="drawCommand">Put text</label>
      <div>
        <input type="text" id="drawCommand" name="drawCommand" maxlength="5" v-model="_drawCommand"
               pattern="[A-Za-z]+[0-9]"
               title="First Letter Second Number"/>
        <ul v-if="showHints">
          <li v-for="(hint, index) in this._hints" v-bind:key="index" v-on:click="updateCommand(hint)">{{ hint }}</li>
        </ul>
      </div>

      <input type="submit" id="send-button" @click.prevent="executeCommand" value="Send" />
    </form>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import FormErrors from '@/components/FormErrors.vue'
import Board from '@/domain/Board'
import DrawCommandsInterpreter from '../domain/DrawCommandsInterpreter'
import CommandValidator from '../validator/CommandValidator'
import {
  BadFormatError,
  OldPenStillPicked,
  PenNotPickedError,
  PenNotReadyError,
  ValidationError
} from '../domain/errors/ValidationErrors'

@Options({
  components: {
    FormErrors
  }
})
export default class DrawBoard extends Vue {
  private _drawCommand = ''
  private _drawBoard?: DrawCommandsInterpreter
  private _errors: Array<string> = []
  private _hints: Array<string> = ['P', 'D', 'W', 'N', 'E', 'S', 'U']

  public executeCommand (): void {
    console.log(this._drawCommand)
    this._errors = []
    try {
      if (this._drawBoard) {
        this._drawBoard.evaluauteCommand(this._drawCommand)
      }
    } catch (e) {
      this.handleValidationErrors(e)
    }
    this._drawCommand = ''
  }

  get showHints (): boolean {
    return this._drawCommand.length > 0
  }

  get hints (): Array<string> {
    return this._hints
  }

  public updateCommand (newCommand: string) {
    this._drawCommand = newCommand
  }

  public mounted (): void {
    const boards = Array.prototype.slice.call(document.querySelectorAll('canvas'))
      .map(canvas => (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D)
      .map(canvasContext => new Board(canvasContext))
    this._drawBoard = new DrawCommandsInterpreter(boards, new CommandValidator())
  }

  private handleValidationErrors (e: ValidationError) {
    if (e instanceof BadFormatError) {
      this._errors.push('Bad format. It should be P[1-2] U D or [NWES][number]')
    } else if (e instanceof PenNotReadyError) {
      this._errors.push('Before draw you should put down pen on board')
    } else if (e instanceof PenNotPickedError) {
      this._errors.push('Please choose a board')
    } else if (e instanceof OldPenStillPicked) {
      this._errors.push('You have to put down old pen to pick new one.')
    } else {
      throw e
    }
  }
}
</script>

<style scoped lang="scss">
  $medBlueTint2: #8E9AC2;
  $medBlue: #42579A;
  $brightBlue: #2D8FE5;
  $brightPink: #D155B8;
  .content {
    padding: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 40rem 1fr;
    grid-template-areas:
      "fstboard fstboard fstboard scdboard scdboard scdboard"
      ". . inputs inputs . .";
  }
  canvas {
    width: 30rem;
    height: 30rem;
    border: 1px black solid
  }

  #firstBoard {
    grid-area: fstboard;
  }

  #secondBoard {
    grid-area: scdboard;
  }

  #inputs {
    grid-area: inputs;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  input {
    width: 15rem;
  }
  ul {
    width: 15rem;
    list-style: none;
    border: 1px solid black;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  #send-button {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    text-align: center;
    width: 20rem;
    height: 6rem;
    border-radius: 5px;

    overflow: hidden;
    background-image: (linear-gradient(270deg, $medBlueTint2, $medBlue));
    background-size: 400% 400%;
    animation: TransistioningBackground 10s ease infinite;
    transition: 0.6s;

    &:hover {
      background-image: (linear-gradient(to left, $brightBlue, $brightPink));
      width: 25rem;
      height: 8rem;
      cursor: pointer;
      &:before,
      &:after {
        transform: translateX(40rem) skewX(-15deg);
        transition: 0.7s;
      }
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      background: rgba(255,255,255, 0.5);
      width: 4rem;
      height: 100%;
      top: 0;
      filter: blur(4rem);
      transform: translateX(-20rem) skewX(-15deg);
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      background: rgba(255,255,255, 0.2);
      width: 2rem;
      height: 100%;
      top: 0;
      filter: blur(1rem);
      transform: translateX(-20em) skewX(-15deg);
    }
  }

  li:hover {
    background-color: blueviolet;
    cursor: pointer;
  }

  @keyframes TransistioningBackground {
    0% {
      background-position: 1% 0;
    }
    50% {
      background-position: 99% 100%;
    }
    100% {
      background-position: 1% 0;
    }

  }
</style>
