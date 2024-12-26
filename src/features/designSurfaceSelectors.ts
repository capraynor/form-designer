import { getControlByName } from "../controls/ControlRegistry";
import { RootState } from "../store";
export const getDesignSurfaceElements = (state: RootState) => state.designSurface.elements;
export const getToolboxSelectedControlName = (state: RootState) => state.designSurface.toolboxSelectedControlName;
export const getDesignSurfaceSelectedControlID = (state: RootState) => state.designSurface.selectedControlInstanceID;
export const getControlByToolboxSelectedControlName = (state: RootState) => {
  const controlName = getToolboxSelectedControlName(state);
  if (!controlName) {
    return null;
  }

  return getControlByName(controlName);
}

export const getSelectedControlInstance = (state: RootState) => {
  const controlID = getDesignSurfaceSelectedControlID(state);
  if (!controlID) {
    return null;
  }

  return state.designSurface.elements.find(x => x.controlInstanceID === controlID);
}