import { Color, createImageCanvas } from './image'
import { line } from './line'
import { readModelFromRaw } from './model_reader'

import fileContents from './model/african_head/african_head.obj?raw'

const image = createImageCanvas()

let white: Color = [255, 255, 255, 255]
// let red: Color = [255, 0, 0, 255]

// line(13, 20, 80, 40, image, white) // horiz, small slope
// line(20, 13, 40, 80, image, red) // horiz, large slope
// line(90, 10, 90, 80, image, white) // vertical line
// line(13, 80, 70, 10, image, white)
// line(80, 40, 17, 21.2, image, red) // should write over top of the first line

let model = readModelFromRaw(fileContents)

// cool, now draw them
for (const face of model.faces) {
    for (let i = 0; i < 3; i++) {
        const v0 = model.vertices[face[i] - 1]
        const v1 = model.vertices[face[(i + 1) % 3] - 1]

        let x0 = (v0[0] + 1.0) * (image.size.width / 2.0)
        let y0 = (v0[1] + 1.0) * (image.size.height / 2.0)
        let x1 = (v1[0] + 1.0) * (image.size.width / 2.0)
        let y1 = (v1[1] + 1.0) * (image.size.height / 2.0)

        line(x0, y0, x1, y1, image, white)
    }
}

image.display()
