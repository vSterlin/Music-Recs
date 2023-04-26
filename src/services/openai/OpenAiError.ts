class OpenAiError extends Error {
	constructor(message: string) {
		super(message)
	}
}

class OpenAiValidationError extends OpenAiError {
	constructor() {
		super("Validation error")
	}
}

export { OpenAiValidationError }
