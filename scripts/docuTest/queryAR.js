const result = await adapter.remedy.search(
    "CTM:People",
    "'Remedy Login ID' = \"Allen\"",
    "Full Name, Remedy Login ID, First Name, Last Name, Department");
resolve (result);