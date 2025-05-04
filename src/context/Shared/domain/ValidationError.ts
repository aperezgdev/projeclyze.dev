export class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(`Validation error on field ${field}: ${message}`)
  }
}
