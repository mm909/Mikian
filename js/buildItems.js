let catListCount = []

jQuery(document).ready(function() {

  // On first load, build items with empty filter
  buildItems("");

  // Reset clear link and attach on click event
  checkClear()
  $("#clearLink").click(function() {
    document.getElementById("searchBox").value = ""
    buildItems('');
    checkClear()
  });
});

// Attach these events every time items are built
function attachEvents() {

  // Add the show more button
  $(".showMore").click(function() {
    if ($("#" + this.id).text().toLowerCase().includes("more")) {
      $("#" + this.id).text("- Show Less")
      $(".item" + this.id).css('display', 'block')
    } else {
      $("#" + this.id).text("+ Show More (" + Math.abs(3 - catListCount[this.id.split('sm')[1]]) + ")") // This math can be moved elsewhere
      $(".item" + this.id).css('display', 'none')
    }
  });

  // Reset language events
  // Make the language buttons clickable
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

// Build search terms at the top of the page and attach the language events to them.
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

  // Start timer
  Start = new Date();

  // CLear all items
  $(".resumeBox").empty()

  // Set standard limits
  let itemLimit = 3
  let objectiveLimit = 3

  // Grab filter
  ogFilter = filter
  filter = filter.toLowerCase();

  // All items start as canidates to be shown
  // Filter out canidates
  let canidates = [];
  if (filter == "") {
    canidates = items
  } else {

    for (var i = 0; i < items.length; i++) {
      var include = false

      // Check if filter matches workplace or role
      if (items[i].workplace.toLowerCase().includes(filter) || items[i].role.toLowerCase().includes(filter)) {
        include = true
      }

      // Check if filter matches any of the objectives
      for (var j = 0; j < items[i].objectives.length; j++) {
        if (items[i].objectives[j].toLowerCase().includes(filter)) {
          include = true
        }
      }

      // If the item has index terms, also check those
      if (items[i].index) {
        for (var j = 0; j < items[i].index.length; j++) {
          if (items[i].index[j].toLowerCase().includes(filter)) {
            include = true
          }
        }
      }

      // If it's included, add it to canidates list
      if (include) {
        canidates.push(items[i])
      }
    }
  }

  // After finding all viable canidates
  // Create category list/titles
  // End with one list of category strings
  // And another for counts of items in each category
  let categoryList = []
  for (var i = 0; i < canidates.length; i++) {
    if (!categoryList.includes(canidates[i].category)) {
      catListCount[categoryList.length] = 1
      categoryList.push(canidates[i].category)
    } else {
      catListCount[(categoryList.indexOf(canidates[i].category))]++
    }
  }

  // If there is only one category, show all items in that category
  let showall = false
  if (categoryList.length == 1) {
    showall = true
  }

  // Start limits at default
  let tempObjectiveLimit = objectiveLimit
  let tempItemLimit = itemLimit

  // Build categories
  for (var i = 0; i < categoryList.length; i++) {

    // If showall, set limits to max
    if (showall) {
      tempItemLimit = canidates.length
    }

    // Build and attach category header html
    let cat = `
    <div class="category">
      <h4 class="category-title"><u><i>` + categoryList[i] + `</i></u></h4>
      <div id=` + categoryList[i].replace(" ", "-") + `> </div>`

    if (catListCount[i] > tempItemLimit) {
      cat += `<p class="showMore" id="sm` + i + `"> + Show More (` + Math.abs(tempItemLimit - catListCount[i]) + `) </p> <hr></div>`
    } else {
      cat += `
      <hr class='emptyhr'>
      </div>`
    }

    $jcat = $(cat)
    $(".resumeBox").append($jcat);
  }


  // Keep track of the number of items that apply to each search term
  let searchTermCounts = []
  for (var i = 0; i < searchTerms.length; i++) {
    searchTermCounts.push(0)
  }

  // Build each item, track placements, and underline search term,
  let itemCount = 0
  let currentPlacements = []
  currentPlacements = [0]
  for (var i = 0; i < canidates.length; i++) {

    // If there is a objectlimit set for this item, override ObjectiveLimit
    for (var j = 0; j < limits.length; j++) {
      if (limits[j].workplace == canidates[i].workplace) {
        tempObjectiveLimit = limits[j].objectiveLimit
      }
    }

    // If showall, set limits to max
    if (showall) {
      tempObjectiveLimit = canidates[i].objectives.length
    }

    let objectives = "";
    let objIndexes = []
    let objCount = 0
    let highlight = false
    let more = false

    // Keep track of the number of items placed under each category
    if (currentPlacements[(categoryList.indexOf(canidates[i].category))]) {
      currentPlacements[(categoryList.indexOf(canidates[i].category))]++
      if (currentPlacements[(categoryList.indexOf(canidates[i].category))] > tempItemLimit) {
        more = true
      }
    } else {
      currentPlacements[(categoryList.indexOf(canidates[i].category))] = 1
    }

    // Get most relevent objective and underline search term
    for (var j = 0; j < canidates[i].objectives.length; j++) {
      if (canidates[i].objectives[j].toLowerCase().includes(filter) && objCount < tempObjectiveLimit) {
        objIndexes.push(j)
        objectives += "<li class='objective'>" + betterReplace(canidates[i].objectives[j], filter) + "</li>"
        objCount++
        highlight = true
      }
    }

    // If there were not enought objectives that matched search terms then fill in the rest
    for (var j = 0; j < canidates[i].objectives.length && objCount < tempObjectiveLimit; j++) {
      if (!objIndexes.includes(j)) {
        objIndexes.push(j)
        objectives += "<li class='objective'>" + canidates[i].objectives[j] + "</li>"
        objCount++
      }
    }

    objectives = "<ul class='item-objective-list'> " + objectives + "</ul>"

    // Get final counts for search terms
    if (canidates[i].index) {
      for (var j = 0; j < canidates[i].index.length; j++) {
        if ((searchTerms.indexOf(canidates[i].index[j])) != -1) {
          searchTermCounts[searchTerms.indexOf(canidates[i].index[j])]++
        }
      }
    }

    // If index value was used to inclde it in the search add it to the workplace string
    workplaceStr = canidates[i].workplace
    if (!highlight) {
      if (canidates[i].index) {
        for (var j = 0; j < canidates[i].index.length; j++) {
          key = canidates[i].index[j].toLowerCase();
          if (key.includes(filter) && !canidates[i].role.includes(filter)) {
            workplaceStr += " <span class='indexValue'>(" + canidates[i].index[j] + ")</span>"
            break
          }
        }
      }
    }

    // Build item html
    itemCount++
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

    // Hide the item if needed, add teh showmore tag so that its shown when 'show more' is pressd
    if (more) {
      item = `<span class='showmore itemsm` + (categoryList.indexOf(canidates[i].category)) + `'> ` + item + ' </span>'
    }

    // Attach item to category
    $jitem = $(item)
    $("#" + canidates[i].category.replace(" ", "-")).append($jitem);
  }

  // Once canidates are built, build search terms.
  // Attach needed events
  buildSearchTerms(searchTermCounts)
  attachEvents();

  // Show empty note if needed
  if (currentPlacements.length == 1 && currentPlacements[0] == 0) {
    $(".empty").css("display", "block");
    $('.emptySearchTerm').text(document.getElementById("searchBox").value)
  } else {
    $(".empty").css("display", "none");
  }

  // Display stats
  End = new Date();
  console.log('');
  console.log('Search Term:', ogFilter);
  console.log('\tBuilt page in:', (End - Start) / 1000, 'seconds');
  console.log('\tCategories   :', categoryList.length);
  console.log('\tItems        :', itemCount);
}

// Check if there is anything in the search box
// Hide/show the clear link
function checkClear() {
  if (document.getElementById("searchBox").value != '') {
    $("#clearLink").css('display', 'inline')
  } else {
    $("#clearLink").css('display', 'none')
  }
}

// Used to splice in text around search term
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