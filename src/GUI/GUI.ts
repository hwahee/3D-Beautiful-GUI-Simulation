import { Scene, TargetCamera, TransformNode, WebXRHitTest } from "@babylonjs/core"
import * as GUI from "@babylonjs/gui"
import { AdvancedDynamicTextureTreeItemComponent } from "@babylonjs/inspector/components/sceneExplorer/entities/gui/advancedDynamicTextureTreeItemComponent"
import { Movable } from "../objects/Object"

class GUIManager {
	private _advTexture: GUI.AdvancedDynamicTexture | undefined
	constructor(advTexture?: GUI.AdvancedDynamicTexture) {
		this._advTexture = advTexture
	}
	init(advTexture: GUI.AdvancedDynamicTexture) {
		delete this._advTexture
		this._advTexture = advTexture
	}
	setAdvTextureToRemote(name: string, scene: Scene): GUI.AdvancedDynamicTexture {
		return GUI.AdvancedDynamicTexture.CreateFullscreenUI(name)
	}
	set3DInfra(target: Movable, panelType: string) {
		target.gui3dManager = new GUI.GUI3DManager(target.getScene())
		switch (panelType) {
			case "sphere":
				target.gui3dPanel = new GUI.SpherePanel()
				break
			default:
				target.gui3dPanel = new GUI.PlanePanel()
				break
		}
		target.gui3dManager.addControl(target.gui3dPanel)
		target.gui3dPanel?.linkToTransformNode(target)
		// setInterval(() => { target.gui3dPanel.rotation = camera.getRotation() }, 100)
	}

	setNameTag(name: string, op: {
		innerText?: string, fontSize?: number, color?: string, offsetY?: number
	}, target: Movable): void {
		const n = new GUI.TextBlock(name, op.innerText ?? "DEFAULT NAMETAG")
		n.fontSize = op.fontSize ?? 10
		n.color = op.color ?? "black"

		target.advTexture?.addControl(n)
		n.linkWithMesh(target)
		n.linkOffsetY = op.offsetY ?? -20
	}
	setBtn(name: string, op: {
		innerText?: string, w?: number | string, h?: number | string, color?: string, bgcolor?: string, top?: string, left?: string, thick?: number, vAlign?: number, hAlign?: number, offsetY?: number
	}, target?: Movable): void {
		const b = GUI.Button.CreateSimpleButton(name, op.innerText ?? "")
		b.width = op.w ?? b.width
		b.height = op.h ?? b.height
		b.color = op.color ?? b.color
		b.background = op.bgcolor ?? b.background
		b.top = op.top ?? b.top
		b.left = op.left ?? b.left
		b.thickness = op.thick ?? b.thickness
		b.verticalAlignment = op.vAlign ?? b.verticalAlignment
		b.horizontalAlignment = op.hAlign ?? b.horizontalAlignment
		b.linkOffsetY = op.offsetY ?? b.linkOffsetY

		if (target) {
			target.advTexture.addControl(b)
			b.linkWithMesh(target)
		}
		else {
			this._advTexture?.addControl(b)
		}
	}
	setBtn3(name: string, op: {
		innerText?: string, w?: number | string, h?: number | string, color?: string, bgcolor?: string, top?: string, left?: string, thick?: number, vAlign?: number, hAlign?: number, offsetY?: number
	}, target: Movable): void {
		if ((target.gui3dPanel?.children.map((i) => (i.name)) ?? []).includes(name)) return

		const b = new GUI.HolographicButton(name)
		b.name = name
		b.text = op.innerText ?? "default"

		target.gui3dPanel?.addControl(b)
		console.log(target.gui3dPanel)
	}
	setLine(name: string, op: {}, target?: Movable) {
	}
	setFnByName(name: string, fn: () => void, target?: Movable) {
		if (target?.gui3dPanel) {
			const target3d = target?.gui3dPanel
			if (target3d) {
				target3d.children
					.filter((i) => (i.name == name))
					.forEach((i) => {
						i.onPointerUpObservable.add(fn)
					})
			}
		}
		else {
			const targetAdvTexture: GUI.AdvancedDynamicTexture = (target) ? target.advTexture : this._advTexture
			targetAdvTexture?.rootContainer.children
				.filter((i) => (i.name == name))
				.forEach((i) => {
					i.onPointerUpObservable.add(fn)
				})
		}
	}

	/**
	 * ????????? ????????? advTexture ?????? gui????????? ????????????.
	 * target??? ???????????? ???????????? ????????? gui,
	 * target??? ??????????????? Movable ?????? gui
	 * @param nameOrLambda - string??? ?????? ????????? ?????? ???, lambda??? ?????? ????????? ?????? ??????
	 * @param target 
	 */
	removeByName(nameOrLambda: string | ((arg0: any) => boolean), target?: Movable) {
		let myfilter: (arg0: any) => boolean
		if (typeof nameOrLambda == typeof "")
			myfilter = (i) => (i.name == nameOrLambda)
		else
			myfilter = nameOrLambda as (arg0: any) => boolean

		if (target?.gui3dPanel) {
			const target3d = target?.gui3dPanel
			if (target3d) {
				target3d.children
					.filter(myfilter)
					.forEach((i) => {
						target3d.removeControl(i)
					})
			}
		}
		else {
			const targetAdvTexture: GUI.AdvancedDynamicTexture = (target) ? target.advTexture : this._advTexture
			targetAdvTexture?.rootContainer.children
				.filter(myfilter)
				.forEach((i) => {
					targetAdvTexture?.removeControl(i)
				})
		}
	}
}

const gui = new GUIManager()
export { gui }