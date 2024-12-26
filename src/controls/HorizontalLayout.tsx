import PropTypes from "prop-types";
import React, { Fragment, useState } from "react"
import { ControlDefaultPropValues, ControlProps, ControlPropTypes } from "./ControlProps"
import { designSurfaceActions, DesignSurfaceElement } from "../features/designSurfaceSlice";
import { getControlByToolboxSelectedControlName, getDesignSurfaceElements } from "../features/designSurfaceSelectors";
import { useDispatch, useSelector } from "react-redux";
import { getControlByName } from "./ControlRegistry";
import { getSelectedControlInstance } from "../features/designSurfaceSelectors";



export type HorizontalLayoutProps = {

} & ControlProps;

//We only define the design time behaviors in here. 

export function HorizontalLayout(props: HorizontalLayoutProps) {

  const selectedToolboxControl = useSelector(getControlByToolboxSelectedControlName);

  const allElements = useSelector(getDesignSurfaceElements);
  const dispatch = useDispatch();

  const allChildren = allElements.filter(x => x.parentControlInstanceID === props.controlInstanceID);
  const [insertPlace, setInsertPlace] = useState(""); // format: "after-instanceID" or exactly "beginning"

  const selectedControlInstance = useSelector(getSelectedControlInstance);

  function onControlPointerMove(e: React.PointerEvent<HTMLDivElement>, designSurfaceElement: DesignSurfaceElement, index: number, total: number) {

    if ((e.target as HTMLElement).dataset?.insertPlace === `after-${designSurfaceElement.controlInstanceID}`) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;


    if (x > rect.width / 2) {
      setInsertPlace(`after-${designSurfaceElement.controlInstanceID}`);
    } else if (index === 0) {
      setInsertPlace("beginning");
    } else if (x <= rect.width / 2) {
      setInsertPlace(`after-${allChildren[index - 1].controlInstanceID}`);
    }
  }

  function onLayoutPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).dataset?.insertPlace === "beginning") {
      return;
    }

    if (e.target !== e.currentTarget) {
      return;
    }

    setInsertPlace("beginning");
  }

  function onLayoutPointerLeave(e: React.PointerEvent<HTMLDivElement>) {
    setInsertPlace("");
  }

  function onLayoutPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setInsertPlace("");
    if (selectedToolboxControl) {
      if (selectedToolboxControl.defaultPropValues.controlType == "Layout") {
        console.log("Nested Layout currently not supported");
        return;
      }

      const newControl = {
        controlName: selectedToolboxControl.defaultPropValues.controlName,
        parentControlInstanceID: props.controlInstanceID,
        controlInstanceProps: selectedToolboxControl.defaultPropValues
      }

      if (insertPlace === "beginning") {
        dispatch(designSurfaceActions.addControlInstance({
          ...newControl,
          afterControlInstanceID: null
        }))

      } else {
        dispatch(designSurfaceActions.addControlInstance({
          ...newControl,
          afterControlInstanceID: insertPlace.replace("after-", "")
        }))
      }
    }
  }

  function onControlPointerDown(e: React.PointerEvent<HTMLDivElement>, designSurfaceElement: DesignSurfaceElement) {
    dispatch(designSurfaceActions.selectControlInstance(designSurfaceElement.controlInstanceID));
  }


  var shouldShowBeginningIndicator = insertPlace === "beginning" && !!selectedToolboxControl;
  return <div className="w-full min-h-[80px]  p-4 relative">
    <div className="information absolute top-0 left-0 text-xs bg-slate-50 text-gray-400">
      {props.controlName}: {props.controlInstanceID}
    </div>
    <div
      onPointerMove={onLayoutPointerMove}
      onPointerLeave={onLayoutPointerLeave}
      onPointerUp={onLayoutPointerUp}

      className="design-area flex relative flex-row bg-dotted h-full w-full box-border">


      {
        shouldShowBeginningIndicator &&
        <div data-insert-place="beginning" className="insert-indicator w-1 h-full bg-red-600 flex-grow">{selectedToolboxControl?.defaultPropValues.controlName}</div>
      }

      {
        allChildren.map((x: DesignSurfaceElement, i: number) => {
          const Control = getControlByName(x.controlName);
          const shouldShowIndicator = insertPlace === `after-${x.controlInstanceID}` && !!selectedToolboxControl;

          const controlInstanceProps = {
            ...x.controlInstanceProps,
            controlInstanceID: x.controlInstanceID,
            parentControlInstanceID: x.parentControlInstanceID
          }

          const isSelectedControl = x.controlInstanceID === selectedControlInstance?.controlInstanceID;

          const selectedClassName = isSelectedControl ? "border-2 border-blue-600" : "";

          return <Fragment key={x.controlInstanceID}>
            <div
              className={`p-2 border-white border-2 flex-grow bg-slate-300 relative ${selectedClassName}`}
              onPointerMove={(e) => onControlPointerMove(e, x, i, allChildren.length)}
              onPointerDown={(e) => onControlPointerDown(e, x)}
            >
              <div className="information absolute top-0 right-0 text-xs bg-slate-50 text-gray-400">
                {x.controlName}: {x.controlInstanceID}
              </div>
              <Control key={x.controlInstanceID} controlInstanceID={x.controlInstanceID} {...controlInstanceProps} />
            </div>
            {
              shouldShowIndicator && <div className="insert-indicator w-1 h-full bg-red-600 flex-grow">{selectedToolboxControl?.defaultPropValues.controlName}</div>
            }
          </Fragment>
        })
      }
    </div>
  </div>
}

HorizontalLayout.propTypes = {
  childComponents: PropTypes.array.isRequired,
  ...ControlPropTypes
}

HorizontalLayout.defaultPropValues = {
  ...ControlDefaultPropValues,
  childComponents: [],
  controlName: "Horizontal Layout",
  description: "A horizontal layout control",
  controlType: "Layout",

} as HorizontalLayoutProps;