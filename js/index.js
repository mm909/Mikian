// console.log(items);

jQuery(document).ready(function() {
  var typed = new Typed('#searchBox', {
    strings: [
      'Search for.^500.^500.',
      'Neural Networks',
      'MINST',
      'CIFAR-10',
      'Tensorflow',
      'ANN',
      'CNN',
      'Genetic Algorithm',
      'Flappy Bird',
      'Twitter API',
      'C',
      'C++',
      'HTML/JS/CSS',
      'SASS/PUG',
      'Teaching',
      'CompTIA',
      'UNLV',
    ],
    smartBackspace: true,
    typeSpeed: 40,
    backSpeed: 40,
    loop: true,
    attr: 'placeholder'
  });
});