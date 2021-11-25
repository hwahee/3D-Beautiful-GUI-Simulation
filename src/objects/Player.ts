import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { POS } from "../system/Global";
import { Movable } from "./Object";

/**
 * 가상의 플레이어를 설정해서 카메라가 따라다니도록 한다
 */
class Player extends Movable {
	constructor(scene: Scene, name?: string) {
		super(scene, name ?? "Player")
	}
	async load() {
		this.position = new Vector3(0, 0, 0)
		this._attachMove()
	}
	protected _detachMove(){}
}
234
export { Player }