function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--){
		j = Math.floor(Math.random() * (i+1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}

	return a;
}


// function readyBoard(){
	// var numbers = [1,2,3,4,5,6,7,8];
	// numbers.push.apply(numbers, numbers);
	// numbers = shuffle(numbers);


// }

$(document).ready(function () {
	var numbers = [1,2,3,4,5,6,7,8];
	numbers.push.apply(numbers, numbers);
	numbers = shuffle(numbers);
	var prevIndex = null;
	var currentIndex = null;

	for (var i = numbers.length - 1; i >= 0; i--) {
		console.log(numbers[i]);
	}


			$('.box').click(function () {
				if ($(this).hasClass('paired')) {
					alert("paired");
				} else {
					currentIndex = ($(this).attr("position"));

					// $(this).children('p').text(numbers[index]);
					console.log(currentIndex)
					$(this).text(numbers[currentIndex]).addClass('selected');
					// $(this).addClass('selected');

					if (prevIndex === null){
						prevIndex = currentIndex;
						return;
					} else if (numbers[prevIndex] === numbers[currentIndex]){
						$(this).addClass('paired')
						return;
									// $('box[position="${prevIndex}').addClass('paired')
					}


					$(this).removeClass('selected')

				}

				// $(this).removeClass('selected').text('');
				console.log("Prev index: " + prevIndex)
				console.log("Current index: " + currentIndex)
				prevIndex = null;
				currentIndex = null;
			});
			// console.log($(this).getAttribute('position'));
			// console.log('first:  '+firstNumber);
			// console.log('second:  ' +secondNumber);

		});