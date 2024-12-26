import PropTypes from "prop-types";
import { ControlDefaultPropValues, ControlProps, ControlPropTypes } from "./ControlProps";

export type TextInputProps = {
  value: string;
  labelText: string;
  watermark: string;
} & ControlProps;

export function TextInput(props: TextInputProps) {
  return <div className="text-input">
    <label className="block">{props.labelText}</label>
    <input value={props.value} />
  </div>
}

TextInput.propTypes = {
  ...ControlPropTypes,
  value: PropTypes.string.isRequired,
  watermark: PropTypes.string.isRequired,
}

TextInput.defaultPropValues = {
  ...ControlDefaultPropValues,
  value: "",
  labelText: "Text Input",
  watermark: "",
  controlName: "Text Input",
  description: "A text input control",
  controlType: "Control"
} as TextInputProps;