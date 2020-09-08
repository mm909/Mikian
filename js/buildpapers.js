jQuery(document).ready(function() {
  buildPapers()
});

function buildPapers() {
  // CLear all items
  $(".paperRow").empty()

  let fhead = `<h4 class="category-title"><u><i>Research Topics</i></u></h4><p class='papersDesc'>I am most interested in:</p>`
  $jhead = $(fhead)
  $(".paperRow").append($jhead);
  let temp = `<div class="papDes">`
  for (var i = 0; i < topics.length; i++) {
    temp += `<li>` + topics[i].topic + `</li>`
  }
  $jhead = $(temp)
  $(".paperRow").append($jhead);

  showShortList = false
  let shortp = `<ol class='shortlist'>`
  for (var i = 0; i < papers.length; i++) {
    if (papers[i].shortlist) {
      if (!showShortList) {
        let head = `<h4 class="category-title"><u><i>Suggested Papers</i></u></h4><p class='papersDesc'>You should read these papers:</p>`
        $jhead = $(head)
        $(".paperRow").append($jhead);
        showShortList = true
      }

      shortp += `<li><a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a></li>`
      shortp += `<div class="papDes">` + papers[i].desc + `</div>`
    }
  }

  if (showShortList) {
    $jp = $(shortp + `</ol><hr>`)
    $(".paperRow").append($jp);
  }

  showtoReadList = false
  shortp = `<div class='paperHolder'>`
  for (var i = 0; i < papers.length; i++) {
    if (papers[i].toRead) {
      if (!showtoReadList) {
        let head = `<h4 class="category-title"><u><i>Current Reading List</i></u></h4><p class='papersDesc'>Papers that I want to read next:</p>`
        $jhead = $(head)
        $(".paperRow").append($jhead);
        showtoReadList = true
      }

      shortp += `<a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a>`
      shortp += `<div class="papDes">` + papers[i].desc + `</div>`
    }
  }
  $jp = $(shortp)
  $(".paperRow").append($jp);

  if (showtoReadList) {
    $jp = $('<hr>')
    $(".paperRow").append($jp);
  }

  let head = `<h4 class="category-title"><u><i>Literature Review</i></u></h4><p class='papersDesc'>Other papers that I have read:</p> <div class='paperHolder'> `
  let placed = 0;
  for (var i = 0; i < papers.length; i++) {
    if (!papers[i].shortlist && !papers[i].toRead) {
      head += `<a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a>`
      if (papers[i].desc) {
        head += `<div class="papDes">` + papers[i].desc + `</div>`
      } else {
        head += "<br> "
      }
      placed += 1
    }
  }
  $jp = $(head)
  $(".paperRow").append($jp);
}