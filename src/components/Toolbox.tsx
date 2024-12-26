import { getAllControls } from "../services/schemaService";

import {Registry} from "../controls/ControlRegistry";
import {designSurfaceActions} from "../features/designSurfaceSlice";

import { useDispatch } from "react-redux";
import { ControlProps } from "../controls/ControlProps";
import { useEffect } from "react";

export function Toolbox() {
  const dispatch = useDispatch();

  function onExtendedFieldsSelected(selectedKey: string) {
    alert("Working in progress")
  }
  function onControlSelected (selectedControlName: string) {
    dispatch(designSurfaceActions.setToolboxSelectedControlName(selectedControlName));
  } 

  function releaseSelectedControl(){
    dispatch(designSurfaceActions.clearToolboxSelectedControlName());
  }

  useEffect(() => {

    window.addEventListener('pointerup', releaseSelectedControl);

    return () => {
      window.removeEventListener('pointerup', releaseSelectedControl);
    };
  }, []);
  
  const allControls = getAllControls();
  
  return <div className="toolbox flex flex-col border border-red-700 bg-red-50 flex-grow">
    <div className="tollbox-header flex border border-black font-bold">
      Customer Profile Properties
    </div>
    <div className="toolbox-tools flex select-none flex-col">
      {allControls.map(x => <ToolboxItem onPointerDown={() => onExtendedFieldsSelected(x.key)} key={x.key} elementKey={x.key} displayName={x.title} type={x.type} format={x.format} />)}
    </div>

    <div className="tollbox-header flex border border-black font-bold">
      Extended Fields
    </div>

    <div className="toolbox-tools flex select-none flex-col">
      {Registry.map(x => <ToolboxItem onPointerDown={() => onControlSelected(x.controlName)} key={x.controlName} elementKey={x.controlName} displayName={x.controlName} type={(x.control.defaultPropValues as ControlProps ).controlType} format={null} />)}
    </div>
  </div>
}

type ToolboxItemProps = {
  elementKey: string;
  displayName: string;
  type: string;
  format: string | null;
  onPointerDown: (controlName: string) => unknown;
}
function ToolboxItem(prop: ToolboxItemProps){
  function onToolboxItemPointerDown(){
    prop.onPointerDown(prop.type);
  }
  return <div onPointerDown={onToolboxItemPointerDown} className="toolbox-item">
    {prop.displayName}
  </div>
}