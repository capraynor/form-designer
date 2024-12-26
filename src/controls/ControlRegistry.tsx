// import { HorizontalLayout } from "./HorizontalLayout";
// import { MaskedInput } from "./MaskedInput";

// export type ControlType = ("Control" | "Layout");

// export type ControlMetadata<TProp> = {
//   controlName: string;
//   description: string;
//   controlType: ControlType;
//   properties: PropertyWithDefaultValue<TProp>[]
// }

// export type MetadataComponentType<T> = React.ComponentType<T> & { metadata: ControlMetadata<T> };
// export function withMetadata<T>(
//   Component: React.ComponentType<T>,
//   metadata: ControlMetadata<T>
// ): React.ComponentType<T> & { metadata: ControlMetadata<T> } {
//   (Component as React.ComponentType<T> & { metadata: ControlMetadata<T> }).metadata = metadata;
//   return Component as React.ComponentType<T> & { metadata: ControlMetadata<T> };
// }

// type PropertyWithDefaultValue<T> = {
//   [K in keyof T]: {
//     propKey: K;
//     displayName: string;
//     defaultValue: T[K];
//   };
// }[keyof T];

// export type ControlInstance<T> = {
//   component: MetadataComponentType<T>,
//   properties: (PropertyWithDefaultValue<T> & {value: T[keyof T]})[]
// }

// export const Registry:MetadataComponentType<any>[] = []


// export function RegisterToToolbox<T>( component: MetadataComponentType<T>) {
//   const {controlName } = component.metadata;

//   if (Registry.filter(x => x.metadata.controlName === controlName).length > 0) {
//     throw new Error(`Control with name ${name} already registered`);
//   }

//   Registry.push(component)
// }

// export function createInstance<T>(component: MetadataComponentType<T>) {
//   const result = {
//     component,
//     properties: component.metadata.properties.map(x => {return {...x, value: x.defaultValue}})
//   } as ControlInstance<T>;

//   return result;
// }

// RegisterToToolbox(MaskedInput);
// RegisterToToolbox(HorizontalLayout);


import { HorizontalLayout } from "./HorizontalLayout";
import { NumberInput } from "./NumberInput";
import { MaskedInput } from "./MaskedInput";
import { TextInput } from "./TextInput";
import { Control, ControlProps } from "./ControlProps";

export type RegistryElement = {
  controlName: string;
  control: Control;
}

export const Registry = [] as RegistryElement[];

function addControl(control: Control) {
  if (Registry.some(x => x.controlName === control.defaultPropValues.controlName)) {
    throw new Error(`Control with name ${control.defaultPropValues.controlName} already registered`);
  }
  Registry.push({controlName: control.defaultPropValues.controlName, control});
}

addControl(NumberInput);
addControl(MaskedInput);
addControl(TextInput);
addControl(HorizontalLayout);

export function getControlByName(name: string) {
  const control = Registry.find(x => x.controlName === name);
  if (control == null) {
    throw new Error(`Control with name ${name} not found`);
  }
  return control.control;
}
