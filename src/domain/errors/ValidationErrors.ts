export class ValidationError extends Error {
}

export class PenNotPickedError extends ValidationError {
}

export class BadFormatError extends ValidationError {
}

export class PenNotReadyError extends ValidationError {

}

export class OldPenStillPicked extends ValidationError {

}
