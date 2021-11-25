import { Camera, Material, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { POS } from "../system/Global";
import { camera } from "./Camera";
import { Movable } from "./Object";

/**
 * 가상의 플레이어를 설정해서 카메라가 따라다니도록 한다
 * 문제: 플레이어의 방향이 카메라의 방향과 일치하지 않음
 */
class Player extends Movable {
	constructor(scene: Scene, name?: string) {
		super(scene, name ?? "Player")
	}
	async load() {
		// const guide=MeshBuilder.CreateCylinder("guide", {height:4, diameterTop:0, diameterBottom:2}, this._scene)
		// const guideMaterial=new StandardMaterial("guide_material", this._scene)
		// guideMaterial.wireframe=true
		// guide.material=guideMaterial
		// guide.rotation=new Vector3(Math.PI/2,0,0)
		// guide.parent=this

		this.position = new Vector3(0, 0, 0)
		this._attachMove()
	}
	protected _detachMove(){}
	subscribeCameraRotation(){
		setInterval(()=>{
			this.rotation=camera.getRotation() ?? Vector3.Zero()
		}, 10)
	}
}
export { Player }