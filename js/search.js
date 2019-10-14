function search() {
  input = document.getElementById("searchBox");
  filterValue = input.value.toLowerCase();
  filterValue = filterValue.replace(/\s+/g, '')
  console.log(filterValue);
  for (var i = 0; i < items.length; i++) {
    var hide = true;
    let key = items[i].workplace.toLowerCase()
    key = key.replace(/\s+/g, '')
    if (key.includes(filterValue)) {
      hide = false;
    }
    key = items[i].role.toLowerCase()
    key = key.replace(/\s+/g, '')
    if (key.includes(filterValue)) {
      hide = false;
    }
    for (var j = 0; j < items[i].objectives.length; j++) {
      key = items[i].objectives[j].toLowerCase();
      key = key.replace(/\s+/g, '')

      if (key.includes(filterValue)) {
        hide = false;
      }
    }
    if (hide) {
      $("#item" + i).css("display", "none")
    } else {
      $("#item" + i).css("display", "")
    }
  }
}