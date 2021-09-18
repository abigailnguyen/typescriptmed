export type Point3D = {
    x: number,
    y: number,
    z: number,
}

// Make Point2D with just x and y members from Point3D
export type Pick1<T> = {
    [P in keyof T]: T[P];
}

export type Pick2<T, K extends keyof T> = {
    [P in K]: T[P];
}

export type Point2D1 = Pick1<Point3D>;
export type Point2D2 = Pick2<Point3D, 'x' | 'y'>;

// All the CSS properties
type CSSProperties = {
    color?: string,
    backgroundColor?: string,
    width?: number,
    height?: number,
}

function setSize(
    element: HTMLElement,
    // Usage: just need the size properties
    size: Pick<CSSProperties, 'width' | 'height'>
){
    element.setAttribute('width', (size.width ?? 0) + 'px')
    element.setAttribute('height', (size.height ?? 0) + 'px')
}