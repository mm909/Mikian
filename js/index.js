// console.log(items);

jQuery(document).ready(function() {
  var typed = new Typed('#searchBox', {
    strings: [
      'Search for.^500.^500.',
      'Neural Networks',
      'Tensorflow',
      'Kaggle',
      'MINST',
      'CIFAR-10',
      'ANN',
      'CNN',
      'Genetic Algorithm',
      'Flappy Bird',
      'C',
      'C++',
      'HTML/JS/CSS',
      'SASS/PUG',
      'Teaching',
      'UNLV',
    ],
    smartBackspace: true,
    typeSpeed: 40,
    backSpeed: 40,
    loop: true,
    attr: 'placeholder'
  });
});