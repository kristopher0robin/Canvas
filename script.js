(async function () {
	const canvas = document.getElementById('canvas')
	const context = canvas.getContext('2d')
	const originalImage = await loadImage('/SinfulDistantAmazondolphin-poster.jpg')
	const mouse = getMouse(canvas)

	const grayFilterInput = document.getElementById('filterGray')
	const redFilterInput = document.getElementById('filterRed')
	const blueFilterInput = document.getElementById('filterBlue')
	const greenFilterInput = document.getElementById('filterGreen')

	let image = originalImage

	const imageParams = {
		offsetX: 0,
		offsetY: 0,
		scale: 1
	}

	canvas.width = 750
	canvas.height = 750

	// setInterval(update, 100)

	// function update () {
	//	 console.log('fire')
	// }

	update()
	function update () {
		requestAnimationFrame(update)

		clearCanvas()
		if (mouse.left) {
			imageParams.offsetX += mouse.dx
			imageParams.offsetY += mouse.dy
		}

		if (mouse.wheel) {
			imageParams.scale -= mouse.wheel / 1000
		}

		context.drawImage(
			image,
			0, 
			0, 
			image.width, 
			image.height,
			imageParams.offsetX, 
			imageParams.offsetY, 
			image.width * imageParams.scale, 
			image.height * imageParams.scale
			)

		mouse.update()
	}

	function clearCanvas () {
		canvas.width = canvas.width
	}

	grayFilterInput.addEventListener('change', () => {
		if (grayFilterInput.checked) {
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(
				image,
				0, 0, image.width, image.height,
				0, 0, image.width, image.height
				)

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
			for (let i = 0; i < imageData.data.length; i += 4) {
				const average = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3
				imageData.data[i] = average
				imageData.data[i + 1] = average
				imageData.data[i + 2] = average
			}

			context.putImageData(
				imageData, 
				0, 
				0, 
				0, 
				0, 
				image.width, 
				image.height
				)

			image = canvas
		} else {
			image = originalImage
		}

	})
	redFilterInput.addEventListener('change', () => {
		if (redFilterInput.checked) {
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(
				image,
				0, 0, image.width, image.height,
				0, 0, image.width, image.height
				)

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
			for (let i = 0; i < imageData.data.length; i += 4) {
				imageData.data[i] = 0
			}

			context.putImageData(
				imageData, 
				0, 
				0, 
				0, 
				0, 
				image.width, 
				image.height
				)

			image = canvas
		} else {
			image = originalImage
		}
	})
	blueFilterInput.addEventListener('change', () => {
		if (blueFilterInput.checked) {
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(
				image,
				0, 0, image.width, image.height,
				0, 0, image.width, image.height
				)

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
			for (let i = 2; i < imageData.data.length; i += 4) {
				imageData.data[i] = 0
			}

			context.putImageData(
				imageData, 
				0, 
				0, 
				0, 
				0, 
				image.width, 
				image.height
				)

			image = canvas
		} else {
			image = originalImage
		}

	})
	greenFilterInput.addEventListener('change', () => {
		if (greenFilterInput.checked) {
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(
				image,
				0, 0, image.width, image.height,
				0, 0, image.width, image.height
				)

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
			for (let i = 1; i < imageData.data.length; i += 4) {
				imageData.data[i] = 0
			}

			context.putImageData(
				imageData, 
				0, 
				0, 
				0, 
				0, 
				image.width, 
				image.height
				)

			image = canvas
		} else {
			image = originalImage
		}

	})
})()