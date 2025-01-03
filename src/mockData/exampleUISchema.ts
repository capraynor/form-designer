export const UISchemaMockData = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/firstName"
        },
        {
          "type": "Control",
          "scope": "#/properties/lastName"
        }
      ]
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/age"
        },
        {
          "type": "Control",
          "scope": "#/properties/dateOfBirth"
        }
      ]
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/height"
        },
        {
          "type": "Control",
          "scope": "#/properties/gender"
        },
        {
          "type": "Control",
          "scope": "#/properties/committer"
        }
      ]
    },
    {
      "type": "Group",
      "label": "Address for Shipping T-Shirt",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/address/properties/street"
            },
            {
              "type": "Control",
              "scope": "#/properties/address/properties/streetnumber"
            }
          ]
        },
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/address/properties/postalCode"
            },
            {
              "type": "Control",
              "scope": "#/properties/address/properties/city"
            }
          ]
        }
      ],
      "rule": {
        "effect": "ENABLE",
        "condition": {
          "scope": "#/properties/committer",
          "schema": {
            "const": true
          }
        }
      }
    }
  ]
}