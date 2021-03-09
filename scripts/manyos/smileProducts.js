const data = [
  {
    "value": "SMILEconnect",
    "label": "SMILEconnect"
  },
  {
    "value": "SMILEcontrol",
    "label": "SMILEcontrol"
  },
  {
    "value": "SMILEcatalog",
    "label": "SMILEcatalog"
  },
  {
    "value": "SMILEdataguard",
    "label": "SMILEdataguard"
  }
];

if (params.sortOnLabel == true) {
    data.sort(function(a, b) {
        const labelA = a.label.toUpperCase(); // Groß-/Kleinschreibung ignorieren
        const labelB = b.label.toUpperCase(); // Groß-/Kleinschreibung ignorieren
        if (labelA < labelB) {
            return -1;
        }
        if (labelA > labelB) {
            return 1;
        }
        // Namen müssen gleich sein
        return 0;
    });
}

resolve(data);