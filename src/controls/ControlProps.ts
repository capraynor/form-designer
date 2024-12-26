import PropTypes, { Requireable, Validator } from "prop-types";
import { Dictionary } from "../mockData/exampleSchema";

export type ControlType = ("Control" | "Layout");

export type ControlProps = {
  labelText: string;
  controlName: string;
  description: string;
  controlType: ControlType;
  controlInstanceID: string;
  parentControlInstanceID: string | null;
}

export type Control = React.ComponentType<any> & {defaultPropValues: ControlProps; propTypes: Dictionary<any>};

export const ControlPropTypes = {
  controlName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  controlType: PropTypes.oneOf(["Control", "Layout"]).isRequired,
  controlInstanceID: PropTypes.string.isRequired,
  parentControlInstanceID: PropTypes.string,
  labelText: PropTypes.string.isRequired,
}

export const ControlDefaultPropValues: ControlProps = {
  labelText: "Control",
  controlName: "A Control",
  description: "This is a control",
  controlType: "Control",
  controlInstanceID: "",
  parentControlInstanceID: null,
}