function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}

	return a;
}

/*function setupGameBoard(number) {
	number = Array.from(new Array(number),(val,index)=>index+1);
	numbers.push.apply(numbers, numbers);
	numbers = shuffle(numbers);



	var div = `<div class="box" position="16"><span><span></div>`;
	// var div = `<div class="box" position="${i}">${element}</div>`;
	// $('.board').append(div);




}*/


$(document).ready(function() {
	var numbers = Array.from(new Array(8), (val, index) => index + 1);
	numbers.push.apply(numbers, numbers);
	numbers = shuffle(numbers);
	var noOfMoves = 0;
	var totalPaired = 0;
	var prevIndex = null;
	var currentIndex = null;

	// for (var i = numbers.length - 1; i >= 0; i--) {
	// 	$(`.box[position=${i}]`).text(numbers[i]);

	// }

	numbers.forEach(function(element, i) {
		$(`.box[position=${i}]`).children('span').text(element);

	})

	setTimeout(function() {
		$('.box').children('span').hide()
	}, 2000);

	$('#newBtn').click(function() {
		// $('.alert').alert()
		// location.reload();
		$('#newModal').modal('show')
	});

	$('.confirmNew').click(function() {
		location.reload();
	})

	// alert("ggwp")
	// $('.box').children('span').hide()


	$('.box').click(function() {
		if ($(this).hasClass('paired')) {
			alert("paired");
			console.log("Prev index: " + prevIndex)
			console.log("Current index: " + currentIndex)
			return;
		} else if ($(this).hasClass('selected')) {
			alert("selected")
			console.log("Prev index: " + prevIndex)
			console.log("Current index: " + currentIndex)
			return;
		} else {
			noOfMoves += 1;
			currentIndex = ($(this).attr("position"));
			console.log("Current:  " + currentIndex)
			$(this).addClass('selected');
			$(this).children('span').show();

			if (prevIndex === null) {
				prevIndex = currentIndex;
				return;
			} else if (numbers[prevIndex] === numbers[currentIndex]) {
				$(`.box[position= ${prevIndex}]`).addClass('paired');
				$(this).addClass('paired');
				totalPaired += 1;
				console.log("total paired:   " + totalPaired);
				if (totalPaired === (numbers.length / 2)) {
					// alert("Game Completed\nTotal Moves : " + noOfMoves);
					$('#completeText').text(`You Completed the game in ${noOfMoves} steps.\nStart new game?`)
					$('#completeModal').modal('show');
				}

				prevIndex = null;
				currentIndex = null;
				return;
			}
			console.log("Prev index: " + prevIndex)
			console.log("Current index: " + currentIndex)


			setTimeout(function($this, prevIndex) {
				$this.removeClass('selected').children('span').hide();

				$(`.box[position=${prevIndex}]`).removeClass('selected').children('span').hide();
			}, 500, $(this), prevIndex);

			prevIndex = null;
			currentIndex = null;

		}

	});

});