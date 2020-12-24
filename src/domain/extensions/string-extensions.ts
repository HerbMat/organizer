declare global {
  interface String {
    extractNumberFromCommand(): number;
    extractLineLengthFromCommand(): number;
  }
}

String.prototype.extractNumberFromCommand = function (): number {
  return Number(this.substring(1))
}

String.prototype.extractLineLengthFromCommand = function (): number {
  return this.extractNumberFromCommand() * 10
}

export {}
