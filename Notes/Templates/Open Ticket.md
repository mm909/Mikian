<%*
let ticket_name = await tp.system.prompt("Ticket:")
const folder = app.vault.getAbstractFileByPath("Tickets");
const files = folder.children;
const number_of_files = files.length + 1;
let ticket_title = "(" + number_of_files + ") " + ticket_name 
await tp.file.rename(ticket_title)
await tp.file.move("Tickets/" + ticket_title + "/" + ticket_title);

const youPrompt = await tp.system.prompt("Test text"); 
const other = await tp.system.suggester(["opt1", "opt2", "opt3"], ["opt1", "opt2", "opt3"])

const allTags = Object.entries(app.metadataCache.getTags())
	.sort((a, b) => a[0].localeCompare(b[0]))
console.log(allTags)

let selectMore = true
let selectedTags = []
while (selectMore) {
  let choice = await tp.system.suggester((t) => t[0] + "(" + t[1] + ")", allTags, false, "[Select more tags (ESC when finished)] - " + selectedTags.join(", "))
  if (!choice) {
    selectMore = false
  } else {
    selectedTags.push(choice[0])
  }
}

tR = "Selected tags: " + selectedTags.join(", ") 

tR += `---
test: ${youPrompt}
other: ${other}
---`

-%>
