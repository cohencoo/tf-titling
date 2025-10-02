const input = document.querySelector("#input")
const submit = document.querySelector("#submit")
const result = document.querySelector("#result")
const clear = document.querySelector("#clear")

clear.onclick = () => {
    input.value = ""
}

submit.onclick = () => {
    const start = performance.now()
    const process = new TFChat(input.value)

    const processedText = process.process()
    const tf = process.tf(processedText)
    const ranked = process.rank(tf)
    const final = process.sort(ranked, processedText)

    r1.value = processedText
    r2.value = JSON.stringify(tf, null, 2)
    r3.value = ranked
    r4.value = final

    const end = performance.now()
    const time = end - start
    document.querySelector("#processing-time").innerText = `Processing time: ${time.toFixed(3)} ms`

    result.innerText = process.toString(final)

    result.scrollIntoView({ behavior: "smooth" })
}
