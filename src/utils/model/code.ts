const stringData = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
function getRandomChar(): string {
    const index = Math.floor((Math.random() * 100) % stringData.length)
    return stringData[index] ?? "x"
}
const numberData = "0123456789"
function getRandomNumber(): string {
    const index = Math.floor((Math.random() * 100) % numberData.length)
    return numberData[index] ?? "0"
}
export const generateRandomCode = (length = 6, type: "number" | "string" | "mix" = "mix"): string => {
    let code = ""
    for (let i = 0; i < length; i++) {
        const r = Math.floor((Math.random() * 100) % 10)
        switch (type) {
            case "mix":
                if (r % 2 === 0) {
                    code += getRandomChar()
                } else {
                    code += getRandomNumber()
                }
                break
            case "string":
                code += getRandomChar()
                break
            case "number":
                code += getRandomNumber()
                break
        }
    }
    return code
}
