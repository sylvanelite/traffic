//TODO:
//base renderer for pushing animations?

class Renderer{
	
	static width=640 ;
	static height=480;
	
	static mousePoint=null;
	
	static mouseMove(e){
		const x = (e.pageX - e.target.offsetLeft)*window.devicePixelRatio;
		const y = (e.pageY - e.target.offsetTop)*window.devicePixelRatio;
		Renderer.mousePoint={x,y};
	}
	static mouseOut(e){
		Renderer.mousePoint = null;
	}
	static isMouseOver(rect){
		if(!Renderer.mousePoint){return false;}
		return (rect.x <= Renderer.mousePoint.x && 
				Renderer.mousePoint.x <= rect.x + rect.width &&
				rect.y <= Renderer.mousePoint.y && 
				Renderer.mousePoint.y <= rect.y + rect.height);
	}
	
	static getSprite(
		url,
		x,y,width,height,
		sx,sy
	){//TODO: load sprite
		return {
			url,
			x,y,width,height,
			sx,sy
		};
	}
	
}


export {Renderer};