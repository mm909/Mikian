jQuery(document).ready(function() {
  buildItems("");
});

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function betterReplace(testStr, filter) {
  if (filter != "" && testStr.toLowerCase().includes(filter.toLowerCase())) {
    testStr = testStr.splice(testStr.toLowerCase().indexOf(filter.toLowerCase()), 0, "<u>")
    testStr = testStr.splice(testStr.toLowerCase().indexOf(filter.toLowerCase()) + filter.length, 0, "</u>")
  }
  return testStr
}

function buildItems(filter) {
  $(".resumeBox").empty()
  // if (filter == "") console.log("Empty Filter");
  filter = filter.toLowerCase();

  var canidates = [];
  for (var i = 0; i < items.length; i++) {
    var include = false

    let key = items[i].workplace.toLowerCase()
    // key = key.replace(/\s+/g, '')
    if (key.includes(filter)) {
      include = true
    }

    key = items[i].role.toLowerCase()
    // key = key.replace(/\s+/g, '')
    if (key.includes(filter)) {
      include = true
    }

    for (var j = 0; j < items[i].objectives.length; j++) {
      key = items[i].objectives[j].toLowerCase();
      // key = key.replace(/\s+/g, '')
      if (key.includes(filter)) {
        include = true
      }
    }

    if (include) canidates.push(items[i])
  }
  if (filter == "") canidates = items
  // console.log(canidates);

  let categoryList = []
  for (var i = 0; i < canidates.length; i++) {
    if (!categoryList.includes(canidates[i].category)) {
      categoryList.push(canidates[i].category)
    }
  }
  // console.log(categoryList);

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
    let objIndexes = []
    let objCount = 0

    for (var j = 0; j < canidates[i].objectives.length; j++) {
      if (canidates[i].objectives[j].toLowerCase().includes(filter) && objCount < 3) {
        objIndexes.push(j)
        objectives += "<li class='objective'>" + betterReplace(canidates[i].objectives[j], filter) + "</li>"
        objCount++
      }
    }

    for (var j = 0; j < canidates[i].objectives.length; j++) {
      if (objCount < 3 && !objIndexes.includes(j)) {
        objectives += "<li class='objective'>" + canidates[i].objectives[j] + "</li>"
        objCount++
      }
    }

    if (objectives != "") {
      objectives = "<ul class='item-objective-list'> " + objectives + "</ul>"
    }

    let item = `
    <div class="item" id="item` + i + `">
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