import { NumberInput } from "../controls/NumberInput";
import { TextInput } from "../controls/TextInput";
import { ObjectProperty, UISchema } from "../mockData/exampleSchema";

const defaultControlMappingByType = {
  "string": TextInput,
  "number": NumberInput
}

//Reference: https://www.learnjsonschema.com/2020-12/format-annotation/format/
// You can define your own format, like DOB.
const defaultControlMappingByFormat = {

}

export function getAllControls (){
  const result: ObjectProperty[] = [];
  for (const key in UISchema.properties) {
    if (UISchema.properties.hasOwnProperty(key)) {
      const element = {
        ...(UISchema.properties as any)[key],
        key
      } as  ObjectProperty;
      result.push(element);
    }
  }

  return result.filter(x => ["updatedAt", 
    "updatedBy", 
    "deletedAt", 
    "deletedBy", 
    "createdAt", 
    "createdBy", "id"].indexOf(x.key) === -1);
}