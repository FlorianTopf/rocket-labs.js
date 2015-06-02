/**
 * Created by vesela on 01.06.15.
 */

class SkinnedMesh extends THREE.Mesh { //example of inheritance
    constructor(geometry, materials) { //example of constructor
        super(geometry, materials); //calling of the parent constructor

        this.idMatrix = SkinnedMesh.defaultMatrix();//using of static method
        this.bones = [];
        this.boneMatrices = [];
        //...
    }
    update(camera) {
        //...
        super.update();
    }
    get boneCount() { //getter
        return this.bones.length;
    }
    set matrixType(matrixType) { //setter
        this.idMatrix = SkinnedMesh[matrixType]();
    }
    static defaultMatrix() { //declaration of static method
        return new THREE.Matrix4();
    }
}

//more interesting examples you can find here http://www.2ality.com/2015/02/es6-classes-final.html
