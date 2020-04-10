let catListCount = []

function checkClear() {
  // console.log(document.getElementById("searchBox").value);
  if (document.getElementById("searchBox").value != '') {
    $("#clearLink").css('display', 'inline')
  } else {
    $("#clearLink").css('display', 'none')
  }
}

jQuery(document).ready(function() {
  buildItems("");
  checkClear()
  $("#clearLink").click(function() {
    document.getElementById("searchBox").value = ""
    buildItems('');
    checkClear()
  });

});

function attachEvents() {

  $(".showMore").click(function() {
    if ($("#" + this.id).text().toLowerCase().includes("more")) {
      $("#" + this.id).text("- Show Less")
      $(".item" + this.id).css('display', 'block')
    } else {
      $("#" + this.id).text("+ Show More (" + Math.abs(3 - catListCount[this.id.split('sm')[1]]) + ")")
      $(".item" + this.id).css('display', 'none')
    }
  });
  $(".language").off()

  $(".language").click(function() {
    if ($(this).text().includes('(')) {
      document.getElementById("searchBox").value = $(this).text().split('(')[0].substring(0, $(this).text().split('(')[0].length - 1)
    } else {
      document.getElementById("searchBox").value = $(this).text()
    }
    buildItems(document.getElementById("searchBox").value);
    checkClear()
  });
}

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

function buildSearchTerms(searchTermCounts) {
  $(".projectCat").empty()
  for (var i = 0; i < searchTerms.length; i++) {
    if (searchTermCounts[i] <= 0) {
      term = `<p class="searchTitle language ` + searchTerms[i].toLowerCase().replace(' ', '') + `"><i>` + searchTerms[i] + `</i><span class="searchCount ` + searchTerms[i].toLowerCase().replace(' ', '') + `Count"></span></p>`
    } else {
      term = `<p class="searchTitle language ` + searchTerms[i].toLowerCase().replace(' ', '') + `"><i>` + searchTerms[i] + `</i><span class="searchCount ` + searchTerms[i].toLowerCase().replace(' ', '') + `Count"> (` + searchTermCounts[i] + `)</span></p>`
    }
    $jterm = $(term)
    $('.projectCat').append($jterm);
  }

}

function buildItems(filter) {

  // CLear out div
  $(".resumeBox").empty()

  // Grab filter
  ogFilter = filter
  filter = filter.toLowerCase();

  // Start to get list of canidates
  // console.log(items.length);
  let canidates = [];
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
          }
        }
      }

      if (include) canidates.push(items[i])
    }
  }

  // Create category list
  let categoryList = []
  let catIndexCount = 0
  for (var i = 0; i < canidates.length; i++) {
    if (!categoryList.includes(canidates[i].category)) {
      catListCount[catIndexCount] = 1
      catIndexCount++
      categoryList.push(canidates[i].category)
    } else {
      catListCount[(categoryList.indexOf(canidates[i].category))]++
    }
  }

  // Build categories
  for (var i = 0; i < categoryList.length; i++) {
    let cat = `
    <div class="category">
      <h4 class="category-title"><u><i>` + categoryList[i] + `</i></u></h4>
      <div id=` + categoryList[i].replace(" ", "-") + `> </div>`
    if (catListCount[i] > 3) {
      cat += `<p class="showMore" id="sm` + i + `"> + Show More (` + Math.abs(3 - catListCount[i]) + `) </p> <hr></div>`
    } else {
      cat += `
      <hr class='emptyhr'>

          </div>`
    }

    $jcat = $(cat)
    $(".resumeBox").append($jcat);
  }

  let searchTermCounts = []
  for (var i = 0; i < searchTerms.length; i++) {
    searchTermCounts.push(0)
  }

  let currentPlacements = []
  currentPlacements = [0]
  for (var i = 0; i < canidates.length; i++) {
    let objectives = "";
    let objIndexes = []
    let objCount = 0
    let highlight = false
    let more = false

    if (currentPlacements[(categoryList.indexOf(canidates[i].category))]) {
      currentPlacements[(categoryList.indexOf(canidates[i].category))]++
      if (currentPlacements[(categoryList.indexOf(canidates[i].category))] > 3) {
        more = true
      }
    } else {
      currentPlacements[(categoryList.indexOf(canidates[i].category))] = 1
    }
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

    if (canidates[i].index) {
      for (var j = 0; j < canidates[i].index.length; j++) {
        if ((searchTerms.indexOf(canidates[i].index[j])) != -1) {
          searchTermCounts[searchTerms.indexOf(canidates[i].index[j])]++
        }
      }
    }


    workplaceStr = canidates[i].workplace
    if (!highlight) {
      if (canidates[i].index) {
        for (var j = 0; j < canidates[i].index.length; j++) {
          key = canidates[i].index[j].toLowerCase();
          if (key.includes(filter) && !canidates[i].role.includes(filter)) {
            // if (key == filter) {
            workplaceStr += " <span class='indexValue'>(" + canidates[i].index[j] + ")</span>"
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

    if (more) {
      item = `<span class='showmore itemsm` + (categoryList.indexOf(canidates[i].category)) + `'> ` + item + ' </span>'
    }

    $jitem = $(item)
    $("#" + canidates[i].category.replace(" ", "-")).append($jitem);
  }
  buildSearchTerms(searchTermCounts)
  attachEvents();
  if (currentPlacements.length == 1 && currentPlacements[0] == 0) {
    $(".empty").css("display", "block");
    $('.emptySearchTerm').text(document.getElementById("searchBox").value)
  } else {
    $(".empty").css("display", "none");
  }
}