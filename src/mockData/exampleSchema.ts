export const UISchema = {
  "title": "Customer",
  "x-i18nTitle": {
    "de-DE": {
      "value": "Kunde"
    },
    "fr-CA": {
      "value": "Client"
    }
  },
  "type": "object",
  "properties": {
    "id": {
      "title": "ID",
      "x-i18nTitle": {
        "de-DE": {
          "value": "ID"
        },
        "fr-CA": {
          "value": "ID"
        }
      },
      "readOnly": true,
      "x-visible": false,
      "type": "string"
    },
    "firstName": {
      "title": "First Name",
      "x-i18nTitle": {
        "de-DE": {
          "value": "Vorname"
        },
        "fr-CA": {
          "value": "Prénom"
        }
      },
      "readOnly": false,
      "x-visible": true,
      "type": "string"
    },
    "lastName": {
      "title": "Last Name",
      "x-i18nTitle": {
        "de-DE": {
          "value": "Nachname"
        },
        "fr-CA": {
          "value": "Nom de famille"
        }
      },
      "readOnly": false,
      "x-visible": true,
      "x-customizable": ["readOnly", "x-visible", "x-i18nTitle"],
      "type": "string"
    },
    "email": {
      "title": "Email",
      "x-i18nTitle": {
        "de-DE": {
          "value": "E-Mail"
        },
        "fr-CA": {
          "value": "Email"
        }
      },
      "readOnly": false,
      "x-visible": true,
      "type": "string"
    },
    "gender": {
      "title": "Gender",
      "x-i18nTitle": {
        "de-DE": {
          "value": "Geschlecht"
        },
        "fr-CA": {
          "value": "Sexe"
        }
      },
      "readOnly": false,
      "x-visible": true,
      "type": "string",
      "enum": ["Male", "Female"],
      "x-i18nEnum": {
        "Male": {
          "de-DE": {
            "value": "Männlich"
          },
          "fr-CA": {
            "value": "Homme"
          }
        },
        "Female": {
          "de-DE": {
            "value": "Weiblich"
          },
          "fr-CA": {
            "value": "Femme"
          }
        }
      },
      "x-customizable": ["x-visible", "enum", "title", "x-i18nTitle"]
    },
    "createdBy": {
      "title": "Created By",
      "x-i18nTitle": {
        "de-DE": {
          "value": "Erstellt von"
        },
        "fr-CA": {
          "value": "Créé par"
        }
      },
      "readOnly": true,
      "x-visible": false,
      "type": "string"
    },
    "createdAt": {
      "title": "Created At",
      "x-i18nTitle": {
        "de-DE": {
          "value": "Erstellt am"
        },
        "fr-CA": {
          "value": "Créé le"
        }
      },
      "readOnly": true,
      "x-visible": false,
      "type": "string"
    },
    "updatedAt": {
      "title": "Updated At",
      "x-i18nTitle": {
        "de-DE": {
          "value":"Aktualisiert am"
        },
        "fr-CA": {
          "value": "Mis à jour le"
        }
      },
      "readOnly": false,
      "x-visible": false,
      "type": "string"
    },
    "updatedBy": {
      "title": "Updated By",
      "x-i18nTitle": {
        "de-DE": {
          "value":"Aktualisiert von"
        },
        "fr-CA": {
          "value": "Mis à jour par" 
        }
      },
      "readOnly": false,
      "x-visible": false,
      "x-customizable": ["x-visible"],
      "type": "string"
    },
    "deletedAt": {
      "title": "Deleted At",
      "x-i18nTitle": {
        "de-DE": {
          "value": "Gelöscht am"
        },
        "fr-CA": {
          "value": "Supprimé le"
        }
      },
      "readOnly": true,
      "x-visible": false,
      "type": "string"
    },
    "deletedBy": {
      "title": "Deleted By",
      "x-i18nTitle": {
        "de-DE": {
          "value": "Gelöscht von"
        },
        "fr-CA": {
          "value": "Supprimé par"
        }
      },
      "readOnly": true,
      "x-visible": false,
      "x-customizable": ["x-visible"],
      "type": "string"
    },
    "required": ["firstName"],
    "x-customizable": ["gender"]
  }
}

export interface Dictionary<T> {
  [key: string]: T;
}

export type ObjectProperty = {
  key: string;
  title: string,
  "x-i18nTitle": Dictionary<{value: string}>,
  readOnly: boolean,
  "x-visible": boolean,
  "x-customizable": string[],
  type: string,
  enum?: string[],
  "x-i18nEnum"?: {
    [key: string]: Dictionary<{value: string}>
  }, 
  format: string,
}