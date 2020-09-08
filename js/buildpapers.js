jQuery(document).ready(function() {
  buildPapers()
});

function search() {
  buildPapers(document.getElementById("searchBox").value)
}

function buildPapers(filter) {

  // CLear all items
  $(".paperRow").empty()

  // Research Topics Section
  if (!filter) {
    // Create "Research Topics" header
    let rt = `<h4 class="category-title"><u><i>Research Topics</i></u></h4><p class='papersDesc'>I am most interested in:</p>`

    // Create Research topics list
    rt += `<div class="papDes">`
    for (var i = 0; i < topics.length; i++) {
      rt += `<li>` + topics[i].topic + `</li>`
    }

    // Attach Header and List to page
    $jrt = $(rt)
    $(".paperRow").append($jrt);

    $jp = $('<hr>')
    $(".paperRow").append($jp);
  }

  // Short list (Suggested Papers) Section
  // Create Short List Header
  let slh = `<h4 class="category-title"><u><i>Suggested Papers</i></u></h4><p class='papersDesc'>You should read these papers:</p>`
  $jslh = $(slh)
  $(".paperRow").append($jslh);

  // Create short list papers list
  let slp = `<ol class='shortlist'>`
  for (var i = 0; i < papers.length; i++) {
    if (papers[i].shortlist) {

      // Paper date, title, link
      slp += `<li><a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a></li>`

      // Tab in everything
      slp += `<div class="papDes">`

      // QPs
      if (papers[i].quickPoints[0] != '') {
        let qpl = ''
        for (var j = 0; j < papers[i].quickPoints.length; j++) {
          qpl += `<li>` + papers[i].quickPoints[j] + `</li>`
        }
        var qp = `<b>Quick Points:</b> <ul class='QPList'>` + qpl + `</ul>`
        slp += qp
      }

      // Citation
      if (papers[i].citation) {
        slp += `  <b>Citation:</b> <br><div class="papDes">` + papers[i].citation + `</div>`
      }

      slp += `<div class="">` + papers[i].desc + `</div>`
      slp += `</div>`
    }
  }
  $jslp = $(slp + `</ol><hr>`)
  $(".paperRow").append($jslp);

  // Create Reading List Section
  // Create Reading list header
  let rl = `<h4 class="category-title"><u><i>Current Reading List</i></u></h4><p class='papersDesc'>Papers that I want to read next:</p>`
  $jrl = $(rl)
  $(".paperRow").append($jrl);

  // Create reading list paper list
  let rlp = `<div class='paperHolder'>`
  for (var i = 0; i < papers.length; i++) {
    if (papers[i].toRead) {
      rlp += `<a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a> <br><div class="papDes">`

      // QPs
      if (papers[i].quickPoints[0] != '') {
        let qpl = ''
        for (var j = 0; j < papers[i].quickPoints.length; j++) {
          qpl += `<li>` + papers[i].quickPoints[j] + `</li>`
        }
        var qp = `<b>Quick Points:</b> <ul class='QPList'>` + qpl + `</ul>`
        rlp += qp
      }

      // Citation
      if (papers[i].citation) {
        rlp += `  <b>Citation:</b> <br><div class="papDes">` + papers[i].citation + `</div>`
      }

      rlp += `<div class="">` + papers[i].desc + `</div> </div>`
    }
  }
  $jrlp = $(rlp)
  $(".paperRow").append($jrlp);

  // Insert Divider
  $jp = $('<hr>')
  $(".paperRow").append($jp);

  // Create General Lit review section
  // Create general lit header
  let glh = `<h4 class="category-title"><u><i>Literature Review</i></u></h4><p class='papersDesc'>Other papers that I have read:</p>`
  $jglh = $(glh)
  $(".paperRow").append($jglh);

  // Create general lit papers list
  let glp = `<div class='paperHolder'> `
  for (var i = 0; i < papers.length; i++) {
    if (!papers[i].shortlist && !papers[i].toRead) {
      glp += `<a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a>`
      glp += `<br> <div class="papDes">`
      // QPs
      if (papers[i].quickPoints[0] != '') {
        let qpl = ''
        for (var j = 0; j < papers[i].quickPoints.length; j++) {
          qpl += `<li>` + papers[i].quickPoints[j] + `</li>`
        }
        var qp = `<b>Quick Points:</b> <ul class='QPList'>` + qpl + `</ul>`
        glp += qp
      }

      // Citation
      if (papers[i].citation) {
        glp += `  <b>Citation:</b> <br><div class="papDes">` + papers[i].citation + `</div>`
      }

      glp += `<div class="">` + papers[i].desc + `</div></div>`
    }
  }
  $jglp = $(glp)
  $(".paperRow").append($jglp);

}