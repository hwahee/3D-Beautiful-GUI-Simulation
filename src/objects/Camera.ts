import { ArcRotateCamera, Scene, TargetCamera, Vector3 } from "@babylonjs/core"
import { Movable } from "./Object"

class MyCamera {
	static cameraModes = ["", "arc", "free"]
	private _mode: string = MyCamera.cameraModes[0]
	private _camera: TargetCamera | undefined

	constructor() { }
	initCamera(scene: Scene, cameraMode?: string) {
		switch (cameraMode) {
			case MyCamera.cameraModes[1]:
			default:
				this._camera = new ArcRotateCamera("Camera", Math.PI / 2 * 2.25, Math.PI / 2 * 0.75, 16, new Vector3(0, 2, 0), scene)
		}
	}
	attachControl(canvas: HTMLCanvasElement) {
		this._camera?.attachControl(canvas, true)
	}
	lookat(target: Movable) {
		this._camera?.setTarget(target.position)
	}
	getCamera() { return this._camera }
}

const camera: MyCamera = new MyCamera()
export { camera }