// Homework Assignment #7: The DOM
const rectangleWrapper = document.getElementById('rectangleWrapper');
console.log('Here are the rectangle IDs:');
for (let i = 0; i < rectangleWrapper.childElementCount; i++) {
	console.log(rectangleWrapper.children[i].id);
}
