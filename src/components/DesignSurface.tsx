import { ObjectProperty } from "../mockData/exampleSchema";
import { designSurfaceActions } from "../features/designSurfaceSlice";
import { getControlByToolboxSelectedControlName, getDesignSurfaceElements} from "../features/designSurfaceSelectors";
import { useDispatch, useSelector } from "react-redux";
import { getControlByName } from "../controls/ControlRegistry";
import { useState } from "react";

export type Column = {
  property: ObjectProperty,
  width: number
}

export type Row = {
  columns: Column[],
}

export function DesignSurface() {
  const [pointerPosition, setPointerPosition] = useState({x: 0, y: 0});
  const controlIndicatorPosition = {
    x: pointerPosition.x + 5,
    y: pointerPosition.y + 5
  }

  const [showControlIndicator, setShowControlIndicator] = useState(false);
  const selectedControl = useSelector(getControlByToolboxSelectedControlName);

  const dispatch = useDispatch();

  function onDesignSurfacePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setShowControlIndicator(false);

    if (e.target !== e.currentTarget){
      return;
    }
    if(selectedControl){

      if (selectedControl.defaultPropValues.controlType !== "Layout") {
        console.log ("Root element must be a layout");
        return;
      }
      dispatch(designSurfaceActions.addControlInstance({
        afterControlInstanceID: null,
        controlName: selectedControl.defaultPropValues.controlName,
        parentControlInstanceID: null,
        controlInstanceProps: selectedControl.defaultPropValues
      }));
    }
  }

  function onDesignerSurfacePointerMove(e: React.PointerEvent<HTMLDivElement>) {

    setShowControlIndicator(e.target === e.currentTarget)
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    setPointerPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return <div onPointerUp={onDesignSurfacePointerUp} 
  onPointerMove={onDesignerSurfacePointerMove} 
  onPointerLeave={(e) => e.target === e.currentTarget && setShowControlIndicator(false)}
  onPointerEnter={(e) => setShowControlIndicator(e.target === e.currentTarget)}
  className="design-surface flex items-start flex-col bg-blue-50 h-full relative">
    {
      useSelector(getDesignSurfaceElements).map(x => {
        const control = getControlByName(x.controlName);
        if(!control){
          return null;
        }
        if (x.parentControlInstanceID) {
          return null;
        }

        const Control = control;
        const controlInstanceProps = {
          ...x.controlInstanceProps,
          controlInstanceID: x.controlInstanceID,
          parentControlInstanceID: x.parentControlInstanceID
        }
        return <Control key={x.controlInstanceID} {...controlInstanceProps} />
      })
    }
    <div className={`indicator absolute ${!showControlIndicator && "hidden"} `} style={{ left: `${controlIndicatorPosition.x}px`, top: `${controlIndicatorPosition.y}px` }}>
      {selectedControl?.defaultPropValues.controlName}
    </div>
  </div>
}