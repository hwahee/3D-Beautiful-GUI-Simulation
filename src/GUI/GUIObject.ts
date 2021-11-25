import { Mesh, MeshBuilder, StandardMaterial, Vector3 } from "@babylonjs/core";
import { Movable } from "../objects/Object";
import { gui } from "./GUI";

class GUIObject extends Movable {
	async load() {
		let guiObject: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this._scene)
		let guiObjectMaterial=new StandardMaterial("guiObjectMaterial", this._scene)
		guiObjectMaterial.wireframe=true
		guiObject.material=guiObjectMaterial
		guiObject.parent=this
		guiObject.position = new Vector3(0, 0, 0)
	}	
	protected _attachButton() {
		let offsetY = 0
		const getOffsetY = () => { offsetY += 20; return offsetY - 20 }
		const getOP = (innerText?: string) => ({ innerText: innerText ?? "button", w: "60px", h: "20px", color: "coral", bgcolor: "skyblue", offsetY: getOffsetY() })

		const btn3: string = `${this.name} INTERFACE 3D`
		gui.setBtn3(btn3, { innerText: "CLEAR BUTTON" }, this)
		gui.setFnByName(btn3, ()=>{
			this.closeInterface()
		}, this)
	}
	protected _detachButton() {
		gui.removeByName((i) => (i.name.includes("INTERFACE")), this)
	}
}

export { GUIObject }