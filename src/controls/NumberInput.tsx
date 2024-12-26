import PropTypes from "prop-types";
import { ControlDefaultPropValues, ControlProps, ControlPropTypes } from "./ControlProps";

export type NumberInputProps = {
  value: number | null;
  labelText: string;
  watermark: string;
} & ControlProps;

export function NumberInput(props: NumberInputProps) {
  let textValue = "";
  if (props.value == null) {
    textValue = "";
  }
  else {
    textValue = props.value.toString();
  }
  return <div className="text-input">
    <label className="block">{props.labelText}</label>
    <input type="number" value={textValue} />
  </div>
}

NumberInput.propTypes = {
  ...ControlPropTypes,
  value: PropTypes.number.isRequired,
  labelText: PropTypes.string.isRequired,
  watermark: PropTypes.string.isRequired,
}

NumberInput.defaultPropValues = {
  ...ControlDefaultPropValues,
  value: null,
  labelText: "Number Input",
  watermark: "",
  controlName: "Number Input",
  description: "A text input control",
  controlType: "Control"
} as NumberInputProps;