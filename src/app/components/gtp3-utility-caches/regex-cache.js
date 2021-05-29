const regexSeed = `Write the JavaScript function to match all instances of the variable "word" within the variable "stonks" and always return an array into the new variable wordMatches.

Output:
let wordMatches = (stonks.match(word) || [])


Write the JavaScript Regex function to remove all HTML comments from the variable "cell_content" and return the same variable.

Output:
cell_content = cell_content.replaceAll(/<!--(.|\n)*-->/g, '')


Write the JavaScript function to remove all instances of a string of normal characters ending in ".ipynb" from the variable "fut_bungus" and return the variable "butt_fungus"

Output:
let butt_fungus = fut_bungus.replaceAll(/(.\/|\()(\w*?).ipynb/g, '')

Write the JavaScript Regex function to replace the string "replace_me" with the string "with_me" within the variable "other_variable".

Output:
other_variable = other_variable.replace(/replace_me/g, "with_me")


Write the JavaScript Regex function to match all content within "div" or "p" tags in variable "foo". Return this in variable "bar".

Output:
let bar = foo.match(/(?:<div|<p)(.?*)(?:</div>|</p>)/g)


`

const regexPrompt = `Write the JavaScript Regex function that matches anything within table or list tags in the variable "tableString".

Output:
`

module.exports = {seed: regexSeed, prompt: regexPrompt}
