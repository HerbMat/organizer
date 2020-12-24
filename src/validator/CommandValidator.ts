export default class CommandValidator {
  private commandMatcher: RegExp

  public constructor () {
    this.commandMatcher = new RegExp('^[P][12]$|^[DU]$|^[ENSW][1-9]*$')
  }

  public validateCommand (command: string): boolean {
    return this.commandMatcher.test(command)
  }
}
