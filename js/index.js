// console.log(items);

jQuery(document).ready(function() {
  var typed = new Typed('#searchBox', {
    strings: [
      'Search for.^500.^500.',
      'Tensorflow',
      'Towards Data Science',
      'Kaggle',
      'Neural Networks',
      'Medium',
      'RNN',
      'LSTM',
      'MINST',
      'Twitter',
      'Genetic Algorithm',
      'C++',
      'HTML/JS/CSS',
      'Teaching',
    ],
    smartBackspace: true,
    typeSpeed: 40,
    backSpeed: 40,
    loop: true,
    attr: 'placeholder'
  });
});