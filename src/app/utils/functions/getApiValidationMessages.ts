export default <T>(errors: ({ path: keyof T, msg: string })[]) => {
    const validationMessages: any = {}

    errors.forEach((error) => {
        validationMessages[error.path] = error.msg
    })

    return validationMessages as T;
}