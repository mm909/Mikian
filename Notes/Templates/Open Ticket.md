<%*
	let ticket_name = await tp.system.prompt("Ticket:")

	const folder = app.vault.getAbstractFileByPath("Tickets");
	const files = folder.children;
	const number_of_files = files.length + 1;
	
	let ticket_title = "(" + number_of_files + ") " + ticket_name 
	await tp.file.rename(ticket_title)
	
	await tp.file.move("Tickets/" + ticket_title + "/" + ticket_title);
-%>