import { PenNotReadyError } from '@/domain/errors/ValidationErrors'

export default class Board {
  private drawBoardContext: CanvasRenderingContext2D
  private _currentPosX = 10
  private _currentPosY = 10
  private _isPenPicked = false

  set isPenPicked (isPenPickedNewState: boolean) {
    this._isPenPicked = isPenPickedNewState
  }

  get isPenPicked (): boolean {
    return this._isPenPicked
  }

  public liftPen (): void {
    this.isPenPicked = false
  }

  public dropPen (): void {
    this.isPenPicked = true
  }

  public constructor (drawBoardContext: CanvasRenderingContext2D) {
    this.drawBoardContext = drawBoardContext
    this.drawBoardContext.moveTo(this._currentPosX, this._currentPosY)
  }

  public drawLineHorizontal (distance: number): void {
    this.validatePen()
    this._currentPosX += distance
    this.drawLine()
  }

  public drawLineVertical (distance: number): void {
    this.validatePen()
    this._currentPosY += distance
    this.drawLine()
  }

  private drawLine (): void {
    this.drawBoardContext.lineTo(this._currentPosX, this._currentPosY)
    this.drawBoardContext.stroke()
  }

  private validatePen (): void {
    if (!this._isPenPicked) {
      throw new PenNotReadyError('Pen not picked')
    }
  }
}
