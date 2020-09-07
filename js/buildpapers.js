jQuery(document).ready(function() {
  buildPapers()
});

function buildPapers() {
  // CLear all items
  $(".paperRow").empty()

  showShortList = false
  let shortp = `<ol class='shortlist'>`
  for (var i = 0; i < papers.length; i++) {
    if (papers[i].shortlist) {
      if (!showShortList) {
        let head = `<h4 class="category-title"><u><i>Short List</i></u></h4>`
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

  let placed = 0;
  for (var i = 0; i < papers.length; i++) {
    if (!papers[i].shortlist) {
      let p = `
      <a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a>
      `
      if (papers[i].desc) {
        p += `<div class="papDes">` + papers[i].desc + `</div>`
      }

      if (placed > 0) {
        p = "<br>" + p
      }

      $jp = $(p)
      $(".paperRow").append($jp);
      placed += 1
    }
  }
}