import * as shell from "shelljs";

// Copy all the vview templates
shell.cp("-R", "src/views", "dist/");
