jQuery(document).ready(function() {
  buildItems("");
});

function buildItems(filter) {
  $(".resumeBox").empty()
  if (filter == "") console.log("Empty Filter");

  var canidates = [];
  for (var i = 0; i < items.length; i++) {
    var include = false

    let key = items[i].workplace.toLowerCase()
    key = key.replace(/\s+/g, '')
    if (key.includes(filter)) {
      include = true
    }

    key = items[i].role.toLowerCase()
    key = key.replace(/\s+/g, '')
    if (key.includes(filter)) {
      include = true
    }

    for (var j = 0; j < items[i].objectives.length; j++) {
      key = items[i].objectives[j].toLowerCase();
      key = key.replace(/\s+/g, '')
      if (key.includes(filter)) {
        include = true
      }
    }

    if (include) canidates.push(items[i])
  }
  if (filter == "") canidates = items
  console.log(canidates);

  let categoryList = []
  for (var i = 0; i < canidates.length; i++) {
    if (!categoryList.includes(canidates[i].category)) {
      categoryList.push(canidates[i].category)
    }
  }
  console.log(categoryList);

  for (var i = 0; i < categoryList.length; i++) {
    let cat = `
    <div class="category">
      <h2 class="category-title"><u><i>` + categoryList[i] + `</i></u></h2>
      <div id=` + categoryList[i].replace(" ", "-") + `> </div>
      <hr>
    </div>
    `
    $jcat = $(cat)
    $(".resumeBox").append($jcat);
  }

  for (var i = 0; i < canidates.length; i++) {
    let objectives = "";

    for (var j = 0; j < canidates[i].objectives.length; j++) {
      objectives += "<li class='objective'>" + canidates[i].objectives[j] + "</li>"
    }

    if (items[i].objectives.length > 0) {
      objectives = "<ul class='item-objective-list'> " + objectives + "</ul>"
    }

    let item = `
    <div class="item" id="item` + i + `">
      <div class="profile"></div>
      <div class="item-text">
        <div class="item-header">
          <div class="title-text">
            <h3 class="workplace">
              ` + canidates[i].workplace + `
            </h3>
            <p class="role">
              <i>` + canidates[i].role + `</i>
            </p>
          </div>
          <div class="item-date">
            <p>
              <i>` + canidates[i].date + `</i>
            </p>
          </div>
        </div>
        <div class="item-objectives">
            ` + objectives + `
        </div>
      </div>
    </div>
    `
    $jitem = $(item)
    $("#" + canidates[i].category.replace(" ", "-")).append($jitem);
  }
}