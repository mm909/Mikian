jQuery(document).ready(function() {
  buildPapers()
});

function buildPapers() {
  // CLear all items
  $(".paperRow").empty()

  for (var i = 0; i < papers.length; i++) {
    let p = `
    <a class='paperLink' href="` + papers[i].link + `">(` + papers[i].date + `) ` + papers[i].title + ` </a>
    `
    if (i > 0) {
      p = "<br>" + p
    }

    $jp = $(p)
    $(".paperRow").append($jp);
  }

}