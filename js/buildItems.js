jQuery(document).ready(function() {
  let categoryList = []
  for (var i = 0; i < items.length; i++) {
    if (!categoryList.includes(items[i].category)) {
      categoryList.push(items[i].category)
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
    $(".resume").append($jcat);
  }

  for (var i = 0; i < items.length; i++) {
    let objectives = "";

    for (var j = 0; j < items[i].objectives.length; j++) {
      objectives += "<li class='objective'>" + items[i].objectives[j] + "</li>"
    }

    if (items[i].objectives.length > 0) {
      objectives = "<ul class='item-objective-list'> " + objectives + "</ul>"
    }

    let item = `
    <div class="item">
      <div class="profile"></div>
      <div class="item-text">
        <div class="item-header">
          <div class="title-text">
            <h3 class="workplace">
              ` + items[i].workplace + `
            </h3>
            <p class="role">
              <i>` + items[i].role + `</i>
            </p>
          </div>
          <div class="item-date">
            <p>
              <i>` + items[i].date + `</i>
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
    $("#" + items[i].category.replace(" ", "-")).append($jitem);
  }
});