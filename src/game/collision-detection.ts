interface CollidingObject {
    x: number;
    y: number;
    radius: number;
}


export class CollisionDetection {

    static isCollision(obj1: CollidingObject, obj2: CollidingObject): boolean {
        return this.distanceBetween(obj1, obj2) < (obj1.radius + obj2.radius);
    }

    private static distanceBetween(obj1: CollidingObject, obj2: CollidingObject): number {
        return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
    }

}
