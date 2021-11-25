import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as GUI from "@babylonjs/gui"
import { ArcRotateCamera, Camera, Color3, Color4, CubeMapInfo, Engine, FreeCamera, HemisphericLight, Light, Matrix, Mesh, MeshBuilder, PointLight, Quaternion, Scene, SceneLoader, ShadowGenerator, StandardMaterial, TargetCamera, Vector3 } from "@babylonjs/core";
import { Player } from "./objects/Player"
import { mouse } from "./system/Mouse";
import { GLBModel, Movable } from "./objects/Object";
import { gui } from "./GUI/GUI";
import { camera } from "./objects/Camera";
import { GUIObject } from "./GUI/GUIObject";
import { showAxis } from "./objects/Axis";

class App {
	private _canvas: HTMLCanvasElement
	private _engine: Engine
	private _scene: Scene
	private _advTexture: GUI.AdvancedDynamicTexture

	private _light: Light
	private _player: Player | undefined
	private _objects: Movable[] = []

	constructor() {
		// create the canvas html element and attach it to the webpage
		this._canvas = document.createElement("canvas") as HTMLCanvasElement
		this._canvas.style.width = "100%"
		this._canvas.style.height = "100%"
		this._canvas.id = "gameCanvas"
		document.body.appendChild(this._canvas)

		// initialize babylon scene and engine
		this._engine = new Engine(this._canvas, true)
		this._scene = new Scene(this._engine)

		camera.initCamera(this._scene, "arc")
		camera.attachControl(this._canvas)

		this._light = new HemisphericLight("light1", new Vector3(1, 10, 0), this._scene)

		showAxis(10, this._scene)
		let lodestone: GUIObject=new GUIObject(this._scene, "Lodestone")
		lodestone.load()

		this._objects[0]=new GUIObject(this._scene, "GUI Object 0")
		this._objects[0].position=new Vector3(-5, 0, 0)
		this._objects[0].load()
		this._objects[1]=new GUIObject(this._scene, "GUI Object 1")
		this._objects[1].position=new Vector3(5, 0, 0)
		this._objects[1].load()

		this._player=new Player(this._scene)
		this._player.setMovement("PV_free", {})
		this._player.load()
		this._player.subscribeCameraRotation()
		camera.lookat(this._player)

		this._advTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

		//cam to mouse raycasting
		mouse.init(this._canvas, this._scene)

		// hide/show the Inspector
		window.addEventListener("keydown", (e) => {
			// Shift+Ctrl+Alt+I
			if (e.shiftKey && e.ctrlKey && e.altKey && e.key == "I") {
				if (this._scene.debugLayer.isVisible()) {
					this._scene.debugLayer.hide()
				} else {
					this._scene.debugLayer.show()
				}
			}
		})
	}

	public run() {
		this._engine.runRenderLoop(() => {
			this._scene.render()
		})
	}
}

const app: App = new App()
app.run()
