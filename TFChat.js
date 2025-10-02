// requirements entry course artificial
// vs.
// artificial course entry requirements

class TFChat {
    accept = "abcdefghijklmnopqrstuvwxyz1234567890 "
    stopWords = `
and
my
is
for
him
she
his
her
to
the
at
this
then
that
thats
than
i
in
it
its
by
of
as
a
you
if
but
do
with
your
not
or
an
so
they
their
on
because
enough
had
what
have
just
like
can
how
them`
        .trim()
        .split("\n")

    constructor(input) {
        this.input = input
    }

    process() {
        // 1. Process text / normalization
        let processedText = ""
        this.input
            .toLowerCase()
            .replaceAll("\n", " ")
            .split("")
            .forEach((char) => {
                if (this.accept.includes(char)) {
                    processedText += char
                }
            })

        // 1.5 Process / trimming double spaces
        return processedText
            .split(" ")
            .map((word) => {
                if (word.trim().length > 0) {
                    if (
                        this.stopWords.includes(word.trim()) ||
                        this.stopWords.includes(word.trim() + "s") // minimal effort for some form of stemming
                    ) {
                        return null
                    } else return word.trim()
                }
            })
            .filter((word) => word)
    }

    tf(processedText) {
        // 2. Build Term-Frequency (TF)
        const tf = {}

        processedText.forEach((word) => {
            if (tf[word] || tf[word] == 0) {
                tf[word] += 1
            } else tf[word] = 1
        })

        return tf
    }

    rank(tf) {
        // 3. Ranking top k results
        const k = 4

        const ranked = Object.entries(tf)
            .sort((item1, item2) => item2[1] - item1[1])
            .splice(0, k)

        return ranked
    }

    sort(ranked, processedText) {
        // 4. Sorting by original position
        let final = []
        ranked.forEach((word) => {
            final.push([word[0], processedText.indexOf(word[0])])
        })

        final = final.sort((item1, item2) => item1[1] - item2[1])
        return final
    }

    toString(final) {
        return final.map((word) => word[0]).join(" ")
    }

    generate() {
        const processedText = this.process()
        const tf = this.tf(processedText)
        const ranked = this.rank(tf)
        const final = this.sort(ranked, processedText)

        return final
    }
}
