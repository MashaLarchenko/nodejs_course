# **Caesar cipher CLI tool**

## Simple console application where you can decode/encode you text from file or enter your text through console.
For encryption using Caesar cipher.

For start application enter in console:

```node index.js --action encode -s 7 -i "./input.txt" -o "./output.txt"```

App get following arguments:

**-s, --shift: a shift** - Specifies a shift to encrypt text (requered argument).
**-i, --input: an input file** - Specifies a input file of encrypt text.
**-o, --output: an output file** - Specifies a output file of encrypt text.
**-a, --action: an action encode/decode** - Specifies a action on encrypt text (requered argument).
