import PropTypes from "prop-types";
import { ControlDefaultPropValues, ControlProps } from "./ControlProps";

export type MaskedInputProps = {
  pattern: string
} & ControlProps;

export function MaskedInput(props: MaskedInputProps) {
  return <div className="masked-input">
    <label className="block">{props.labelText}</label>
    <input />
  </div>
}

MaskedInput.propTypes = {
  pattern: PropTypes.string.isRequired
  
}

MaskedInput.defaultPropValues = {
  ...ControlDefaultPropValues,
  labelText: "Masked Input",
  pattern: "",
  controlName: "Masked Input",
  description: "A masked input control",
  controlType: "Control",
} as MaskedInputProps;

