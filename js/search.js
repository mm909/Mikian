function search() {
  input = document.getElementById("searchBox");
  // filterValue = input.value.toLowerCase();
  filterValue = input.value;
  // filterValue = filterValue.replace(/\s+/g, '')
  // console.log(filterValue);
  buildItems(filterValue);
}