import React from 'https://cdn.skypack.dev/react';


function Canvas(props) {
  const { draw, ...rest } = props;
  const size = { width: 400, height: 250 };
  if(rest.width){
    size.width = rest.width;
  }
  if(rest.height){
    size.height = rest.height;
  }
  const canvRef = React.useRef(null);
  let animationFrame = 0;

  const renderLoop = () => {
    if(canvRef.current){
      draw(canvRef.current);
    }
    animationFrame = requestAnimationFrame(renderLoop);
  };

  React.useEffect(() => {
    if(animationFrame!=0){
      cancelAnimationFrame(animationFrame);
      console.warn("double bind to animation frame");
    }
    animationFrame = requestAnimationFrame(renderLoop);
    return () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
  }, []);

  return <canvas {...props} ref={canvRef} />;
}

export {Canvas};
