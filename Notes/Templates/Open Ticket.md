<%*
let ticket_name = await tp.system.prompt("Ticket:")
let folder = app.vault.getAbstractFileByPath("Tickets");
let number_of_files = folder.children.length + 1;
let ticket_title = "(" + number_of_files + ") " + ticket_name 

await tp.file.rename(ticket_title)
await tp.file.move("Tickets/" + ticket_title + "/" + ticket_title);

let task = await tp.system.prompt("Task:");

let all_tags = Object.entries(app.metadataCache.getTags()).sort((a, b) => a[0].localeCompare(b[0]))

let select_more = true
let selected_tags = []
while (select_more) {
  let choice = await tp.system.suggester((t) => t[0], [['(New Tag)', 0], ...all_tags], false, "[Apply Tags (ESC when finished)] - " + selected_tags.join(", "))

  if (!choice) {
    select_more = false
  } else if (choice[0] === '(New Tag)') {
    let new_tag = await tp.system.prompt('New tag:')
    selected_tags.push("#" + new_tag)
    all_tags.push(["#" + new_tag, 0])
  } else {
    selected_tags.push(choice[0])
  }
}

let version_list = selected_tags.filter(item => /v_.+/.test(item))
if (version_list.length == 0){
	version = "No Version Selected"
} else {
	version = version_list[0].substring(3)
}

let feature_list = selected_tags.filter(item => /f_.+/.test(item))
if (feature_list.length == 0){
	feature = "No Feature Selected"
} else {
	feature = feature_list[0].substring(3)
}

let today = new Date()
let formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
tR = `---
id: ${number_of_files}
ticket: ${ticket_name}
version: ${version}
feature: ${feature}
created_date: ${formattedDate}
completed_date: ${null}
tags:
  - ${selected_tags.map(tag => tag.substring(1)).join("\n  - ")}
---
`
tR += `${task}
`

-%>
