function prepareImageCanvas(): {
    imageData: ImageData
    set: (x: number, y: number, r: number, g: number, b: number, a: number) => void
    display: () => void
} {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('Failed to get 2D context')
    }

    // Create an ImageData object of the same size as the canvas
    let imageData = ctx.createImageData(canvas.width, canvas.height)

    // Function to fill the canvas with a default color (black in this case)
    function fillCanvasWithDefaultColor(
        imageData: ImageData,
        r: number,
        g: number,
        b: number,
        a: number
    ): void {
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i + 0] = r // Red
            imageData.data[i + 1] = g // Green
            imageData.data[i + 2] = b // Blue
            imageData.data[i + 3] = a // Alpha (opacity)
        }
    }

    // Fill the canvas with black by default
    fillCanvasWithDefaultColor(imageData, 0, 0, 0, 255)

    // Function to set a pixel's color in the ImageData object
    function set(x: number, y: number, r: number, g: number, b: number, a: number): void {
        let index = (x + y * imageData.width) * 4
        imageData.data[index + 0] = r
        imageData.data[index + 1] = g
        imageData.data[index + 2] = b
        imageData.data[index + 3] = a
    }

    // Function to display the ImageData object on the canvas
    function display(): void {
        ctx.putImageData(imageData, 0, 0)
    }

    // Return an object containing the imageData, setPixel function, and display function
    return {
        imageData,
        set,
        display,
    }
}

export { prepareImageCanvas }
