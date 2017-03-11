export class Translation {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export function getTranslation(element: Element): Translation {
    const rawTransform = window.getComputedStyle(element).transform;
    if (rawTransform === 'none') {
        return new Translation();
    } else {
        const values = rawTransform.split('matrix(')[1].split(')')[0]
            .split(', ').map((val) => parseFloat(val));
        if (values.length === 6) {
            return new Translation(values[4], values[5]);
        } else if (values.length === 16) {
            return new Translation(values[12], values[13], values[14]);
        } else {
            console.error('Unknown Matrix in getTranslation');
        }
    }
}
