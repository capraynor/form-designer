import { useDispatch, useSelector } from "react-redux"
import { getSelectedControlInstance } from "../features/designSurfaceSelectors";
import { ControlPropTypes } from "../controls/ControlProps";
import { designSurfaceActions, DesignSurfaceElement } from "../features/designSurfaceSlice";

export function PropertyGrid() {

  const selectedControlInstance = useSelector(getSelectedControlInstance);
  const dispatch = useDispatch();


  function onPropertyModified(key: string, value: string) {
    if (!selectedControlInstance) {
      return;
    }
    const clonedElement: DesignSurfaceElement = {
      ...selectedControlInstance,
      controlInstanceProps: {
        ...selectedControlInstance.controlInstanceProps
      }
    }
    clonedElement.controlInstanceProps[key] = value;
    dispatch(designSurfaceActions.updateControlInstance(clonedElement));
  }


  return <div className="property-grid flex flex-col border border-blue-700 bg-green-50 flex-grow">
    <div className="property-grid-header flex border border-black font-bold">
      Properties
    </div>
    <div className="property-grid-content">
      {selectedControlInstance ? <GridItems selectedInstance={selectedControlInstance} onPropertyModified={onPropertyModified} /> : "[No Control Selected]"}
    </div>
  </div>
}


type GridItemsProps = {
  selectedInstance: DesignSurfaceElement,
  onPropertyModified: (key: string, value: string) => void
}

function GridItems(props: GridItemsProps) {
  const basePropType = ControlPropTypes;
  const readOnlyProperties = [
    "controlName",
    "controlType",
    "controlInstanceID",
    "parentControlInstanceID",
    "afterControlInstanceID"
  ]

  const hiddenProperties = [
    "controlType"
  ]

  const labelMapping = {
    "controlName": "Control",
    "controlInstanceID": "Instance ID",
    "parentControlInstanceID": "Parent Instance ID",
    "afterControlInstanceID": "After Instance",
    "description": "Description",
    "labelText": "Label Text"
  } as any;

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    const value = e.target.value;
    props.onPropertyModified(key, value);
  }

  function propertyGridItemsSort(a: string, b: string) {
    return (labelMapping[a] || a).localeCompare(labelMapping[b] || b);
  }



  return <div>
    {Object.keys(basePropType).filter(x => !hiddenProperties.includes(x)).sort(propertyGridItemsSort).map(x => {
      const readonly = readOnlyProperties.includes(x);
      return <div key={props.selectedInstance.controlInstanceID + x} className="property-grid-item flex m-1 box-border">
        <div className="property-grid-item-label w-1/2 m-1 break-words">{labelMapping[x] || x}</div>
        <div className="property-grid-item-value w-1/2 flex items-center">
          <input
            onChange={(e) => onInputChange(e, x)}
            className={`border-black border-2 box-border w-full  ${readonly ? "bg-gray-200" : ""}`}
            type="text" readOnly={readonly} value={(props.selectedInstance as any)[x] || props.selectedInstance.controlInstanceProps[x]} />
        </div>
      </div>
    })}
  </div>

}
