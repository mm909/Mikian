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

  // CLear out div
  $(".resumeBox").empty()

  // Grab filter
  ogFilter = filter
  filter = filter.toLowerCase();

  // Start to get list of canidates
  var canidates = [];
  if (filter == "") {
    canidates = items
  } else {
    for (var i = 0; i < items.length; i++) {
      var include = false

      let key = items[i].workplace.toLowerCase()
      if (key.includes(filter)) {
        include = true
      }

      key = items[i].role.toLowerCase()
      if (key.includes(filter)) {
        include = true
      }

      for (var j = 0; j < items[i].objectives.length; j++) {
        key = items[i].objectives[j].toLowerCase();
        if (key.includes(filter)) {
          include = true
        }
      }

      if (items[i].index) {
        for (var j = 0; j < items[i].index.length; j++) {
          key = items[i].index[j].toLowerCase();
          if (key.includes(filter)) {
            include = true
            console.log(items[i].workplace);
          }
        }
      }

      if (include) canidates.push(items[i])
    }
  }
  console.log(canidates);

  // Create category list
  let categoryList = []
  for (var i = 0; i < canidates.length; i++) {
    if (!categoryList.includes(canidates[i].category)) {
      categoryList.push(canidates[i].category)
    }
  }
  console.log(categoryList);

  // Build categories
  for (var i = 0; i < categoryList.length; i++) {
    let cat = `
    <div class="category">
      <h4 class="category-title"><u><i>` + categoryList[i] + `</i></u></h4>
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
    let highlight = false

    // Get most relevent objective and underline search term
    for (var j = 0; j < canidates[i].objectives.length; j++) {
      if (canidates[i].objectives[j].toLowerCase().includes(filter) && objCount < 3) {
        objIndexes.push(j)
        objectives += "<li class='objective'>" + betterReplace(canidates[i].objectives[j], filter) + "</li>"
        objCount++
        highlight = true
      }
    }

    for (var j = 0; j < canidates[i].objectives.length && objCount < 3; j++) {
      if (!objIndexes.includes(j)) {
        objIndexes.push(j)
        objectives += "<li class='objective'>" + canidates[i].objectives[j] + "</li>"
        objCount++
      }
    }

    if (objectives != "") {
      objectives = "<ul class='item-objective-list'> " + objectives + "</ul>"
    }

    workplaceStr = canidates[i].workplace
    if (!highlight) {
      if (canidates[i].index) {
        for (var j = 0; j < canidates[i].index.length; j++) {
          key = canidates[i].index[j].toLowerCase();
          if (key.includes(filter) && !canidates[i].role.includes(filter)) {
            // if (key == filter) {
            workplaceStr += " (" + canidates[i].index[j] + ")"
            break
          }
        }
      }
    }

    let item = `
    <div class="item" id="item` + i + `">
      <div class="item-text">
        <div class="item-header">
          <div class="title-text">
            <h5 class="workplace">
              ` + workplaceStr + `
            </h5>
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