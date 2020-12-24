import Board from '@/domain/Board'
import CommandValidator from '@/validator/CommandValidator'
import { CommandEnum } from '@/domain/CommandEnum'
import { BadFormatError, OldPenStillPicked, PenNotPickedError } from '@/domain/errors/ValidationErrors'
import '@/domain/extensions/string-extensions'

export default class DrawCommandsInterpreter {
  private readonly _boards: Array<Board>
  private _commandValidator: CommandValidator
  private _chosenBoard = -1

  private get board (): Board {
    return this._boards[this._chosenBoard]
  }

  private get isBoardChosen (): boolean {
    return this._chosenBoard >= 0
  }

  private get isPreviousBoardPenPicked (): boolean {
    return this.isBoardChosen ? this.board.isPenPicked : this.isBoardChosen
  }

  public constructor (boards: Array<Board>, commandValidator: CommandValidator) {
    this._boards = boards
    this._commandValidator = commandValidator
  }

  public evaluauteCommand (command: string) {
    this.validateCommand(command)
    const commandType = command.charAt(0) as CommandEnum
    if (commandType === CommandEnum.P) {
      this.chooseBoard(command)
    } else {
      if (!this.isBoardChosen) {
        throw new PenNotPickedError("The board wasn't chosen")
      }
      switch (commandType) {
        case CommandEnum.D:
          this.board.dropPen()
          break
        case CommandEnum.U:
          this.board.liftPen()
          break
        case CommandEnum.E:
          this.board.drawLineHorizontal(command.extractLineLengthFromCommand())
          break
        case CommandEnum.W:
          this.board.drawLineHorizontal(-command.extractLineLengthFromCommand())
          break
        case CommandEnum.S:
          this.board.drawLineVertical(command.extractLineLengthFromCommand())
          break
        case CommandEnum.N:
          this.board.drawLineVertical(-command.extractLineLengthFromCommand())
          break
      }
    }
  }

  private chooseBoard (command: string) {
    const newChosenBoard = command.extractNumberFromCommand() - 1
    if (this._chosenBoard !== newChosenBoard) {
      if (this.isPreviousBoardPenPicked) {
        throw new OldPenStillPicked('You have to put down pen to pick new one.')
      }
      this._chosenBoard = command.extractNumberFromCommand() - 1
    }
  }

  private validateCommand (command: string) {
    if (!this._commandValidator.validateCommand(command)) {
      throw new BadFormatError('Bad command')
    }
  }
}
